import { BaseProvider } from './BaseProvider';

type SubscriptionType = 'newHeads' | 'logs' | 'newPendingTransactions';

type EventCallback = (...args: any[]) => void;

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}

/**
 * Resolves a WebSocket constructor. Uses the global `WebSocket` (browsers, Node 21+),
 * falls back to the `ws` npm package for older Node versions.
 */
function getWebSocketConstructor(): typeof WebSocket {
  if (typeof WebSocket !== 'undefined') {
    return WebSocket;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('ws') as typeof WebSocket;
  } catch {
    throw new Error(
      'WebSocket is not available. Install the "ws" package for Node < 21.',
    );
  }
}

/**
 * A JSON-RPC provider that communicates over WebSocket instead of HTTP.
 *
 * Supports all the same methods as {@link JsonRpcProvider} (getBalance, getBlock, etc.)
 * plus real-time subscriptions via `eth_subscribe` / `eth_unsubscribe`.
 * @example
 * ```javascript
 * const provider = new WebSocketProvider('wss://eth-mainnet.g.alchemy.com/v2/YOUR_KEY');
 *
 * // Standard JSON-RPC methods work the same as JsonRpcProvider
 * const block = await provider.getBlock('latest');
 *
 * // Real-time subscriptions
 * const subId = await provider.subscribe('newHeads');
 * provider.on('block', (blockHeader) => {
 *   console.log('New block:', blockHeader.number);
 * });
 *
 * // Clean up
 * await provider.unsubscribe(subId);
 * provider.destroy();
 * ```
 */
export class WebSocketProvider extends BaseProvider {
  private _ws: WebSocket | null = null;
  private _wsUrl: string;
  private _requestId = 0;
  private _pendingRequests: Map<number, PendingRequest> = new Map();
  private _subscriptions: Map<string, Set<EventCallback>> = new Map();
  private _eventListeners: Map<string, Set<EventCallback>> = new Map();
  private _subscriptionIdToEvent: Map<string, string> = new Map();
  private _destroyed = false;
  private _reconnectAttempts = 0;
  private _maxReconnectAttempts = 3;
  private _ready: Promise<void>;
  private _readyResolve!: () => void;
  private _readyReject!: (err: any) => void;

  /**
   * @param wsUrl WebSocket URL to connect to (e.g. `wss://eth-mainnet.g.alchemy.com/v2/...`)
   */
  constructor(wsUrl: string) {
    super([wsUrl]);
    this._wsUrl = wsUrl;
    this._ready = this._createReadyPromise();
    this._connect();
  }

  private _createReadyPromise(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._readyResolve = resolve;
      this._readyReject = reject;
    });
  }

  private _connect(): void {
    const WS = getWebSocketConstructor();
    this._ws = new WS(this._wsUrl);

    this._ws.onopen = () => {
      this._reconnectAttempts = 0;
      this._readyResolve();
    };

    this._ws.onmessage = (event: MessageEvent) => {
      let data: any;
      try {
        data = JSON.parse(
          typeof event.data === 'string' ? event.data : String(event.data),
        );
      } catch {
        return; // ignore unparseable messages
      }

      // Handle subscription notifications
      if (data.method === 'eth_subscription' && data.params) {
        const subId: string = data.params.subscription;
        const result = data.params.result;

        // Direct subscription callbacks
        const callbacks = this._subscriptions.get(subId);
        if (callbacks) {
          callbacks.forEach((cb) => {
            try {
              cb(result);
            } catch {
              // don't let user callbacks break the provider
            }
          });
        }

        // Event-based listeners
        const eventName = this._subscriptionIdToEvent.get(subId);
        if (eventName) {
          const listeners = this._eventListeners.get(eventName);
          if (listeners) {
            listeners.forEach((cb) => {
              try {
                cb(result);
              } catch {
                // don't let user callbacks break the provider
              }
            });
          }
        }
        return;
      }

      // Handle JSON-RPC response
      if (data.id != null) {
        const pending = this._pendingRequests.get(data.id);
        if (pending) {
          this._pendingRequests.delete(data.id);
          if (data.error) {
            pending.reject(
              new Error(
                data.error.message ||
                  `JSON-RPC error: ${JSON.stringify(data.error)}`,
              ),
            );
          } else {
            pending.resolve(data.result);
          }
        }
      }
    };

    this._ws.onerror = () => {
      // onerror is always followed by onclose; reconnection is handled there
    };

    this._ws.onclose = () => {
      // Reject all pending requests
      for (const [id, pending] of this._pendingRequests) {
        pending.reject(new Error('WebSocket connection closed'));
        this._pendingRequests.delete(id);
      }

      if (!this._destroyed) {
        this._attemptReconnect();
      }
    };
  }

  private _attemptReconnect(): void {
    if (this._reconnectAttempts >= this._maxReconnectAttempts) {
      this._readyReject(
        new Error(
          `WebSocket reconnection failed after ${this._maxReconnectAttempts} attempts`,
        ),
      );
      return;
    }

    const delay = Math.pow(2, this._reconnectAttempts) * 1000; // 1s, 2s, 4s
    this._reconnectAttempts++;

    this._ready = this._createReadyPromise();

    setTimeout(() => {
      if (!this._destroyed) {
        this._connect();
      }
    }, delay);
  }

  /**
   * Send a raw JSON-RPC request over the WebSocket and wait for the response.
   * @param body JSON-RPC request body. The `id` field is overwritten with an auto-incrementing counter.
   * @returns the `result` field from the JSON-RPC response
   */
  private async _sendRequest(body: Record<string, unknown>): Promise<any> {
    await this._ready;

    const id = ++this._requestId;
    const payload = { ...body, id };

    return new Promise<any>((resolve, reject) => {
      this._pendingRequests.set(id, { resolve, reject });

      if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
        this._pendingRequests.delete(id);
        reject(new Error('WebSocket is not open'));
        return;
      }

      this._ws.send(JSON.stringify(payload));
    });
  }

  // ---- BaseProvider abstract implementations ----

  /** @ignore */
  selectRpcUrl(): string {
    return this._wsUrl;
  }

  /** @ignore */
  post(body: Record<string, unknown>): Promise<any> {
    return this._sendRequest(body);
  }

  // ---- Subscription API ----

  /**
   * Subscribe to real-time Ethereum events via `eth_subscribe`.
   * @param type The subscription type: `'newHeads'`, `'logs'`, or `'newPendingTransactions'`
   * @param params Optional parameters (e.g. filter object for `'logs'`)
   * @returns The subscription ID returned by the node
   * @example
   * ```javascript
   * const subId = await provider.subscribe('newHeads');
   * ```
   * @example
   * ```javascript
   * const subId = await provider.subscribe('logs', {
   *   address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
   *   topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
   * });
   * ```
   */
  async subscribe(type: SubscriptionType, params?: object): Promise<string> {
    const rpcParams: unknown[] = [type];
    if (params) {
      rpcParams.push(params);
    }

    const subscriptionId = (await this._sendRequest({
      jsonrpc: '2.0',
      method: 'eth_subscribe',
      params: rpcParams,
    })) as string;

    // Initialize callback set for this subscription
    this._subscriptions.set(subscriptionId, new Set());

    // Map well-known types to event names
    const eventMap: Record<string, string> = {
      newHeads: 'block',
      newPendingTransactions: 'pending',
      logs: 'logs',
    };
    const eventName = eventMap[type] || type;
    this._subscriptionIdToEvent.set(subscriptionId, eventName);

    return subscriptionId;
  }

  /**
   * Unsubscribe from a previously created subscription.
   * @param subscriptionId The subscription ID to cancel (returned by {@link subscribe})
   * @returns `true` if successfully unsubscribed, `false` otherwise
   */
  async unsubscribe(subscriptionId: string): Promise<boolean> {
    const result = (await this._sendRequest({
      jsonrpc: '2.0',
      method: 'eth_unsubscribe',
      params: [subscriptionId],
    })) as boolean;

    // Clean up maps
    this._subscriptions.delete(subscriptionId);
    this._subscriptionIdToEvent.delete(subscriptionId);

    return result;
  }

  /**
   * Register an event listener for subscription events.
   *
   * Event names correspond to subscription types:
   * - `'block'` → `newHeads` subscription notifications
   * - `'pending'` → `newPendingTransactions` subscription notifications
   * - `'logs'` → `logs` subscription notifications
   * - Any subscription ID → direct subscription callbacks
   * @param event The event name or subscription ID
   * @param callback The function to call when the event fires
   */
  on(event: string, callback: EventCallback): this {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    this._eventListeners.get(event)!.add(callback);
    return this;
  }

  /**
   * Remove an event listener. If no callback is provided, removes all listeners for that event.
   * @param event The event name or subscription ID
   * @param callback The specific callback to remove, or omit to remove all
   */
  off(event: string, callback?: EventCallback): this {
    if (!callback) {
      this._eventListeners.delete(event);
    } else {
      const listeners = this._eventListeners.get(event);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this._eventListeners.delete(event);
        }
      }
    }
    return this;
  }

  /**
   * Close the WebSocket connection cleanly and prevent reconnection.
   * After calling `destroy()`, this provider instance cannot be reused.
   */
  destroy(): void {
    this._destroyed = true;
    if (this._ws) {
      this._ws.close();
      this._ws = null;
    }

    // Reject any remaining pending requests
    for (const [id, pending] of this._pendingRequests) {
      pending.reject(new Error('Provider destroyed'));
      this._pendingRequests.delete(id);
    }

    this._subscriptions.clear();
    this._eventListeners.clear();
    this._subscriptionIdToEvent.clear();
  }

  /**
   * Returns a promise that resolves when the WebSocket connection is open and ready.
   */
  get ready(): Promise<void> {
    return this._ready;
  }
}
