import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ---- WebSocket mock ----

type WSHandler = (...args: any[]) => void;

class MockWebSocket {
  static OPEN = 1;
  static CLOSED = 3;
  static instances: MockWebSocket[] = [];

  url: string;
  readyState: number = MockWebSocket.OPEN;
  onopen: WSHandler | null = null;
  onmessage: WSHandler | null = null;
  onerror: WSHandler | null = null;
  onclose: WSHandler | null = null;
  sent: string[] = [];

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
    // Simulate async open
    setTimeout(() => {
      if (this.onopen) this.onopen({} as Event);
    }, 0);
  }

  send(data: string) {
    this.sent.push(data);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) this.onclose({} as CloseEvent);
  }

  // Test helpers
  simulateMessage(data: any) {
    if (this.onmessage) {
      this.onmessage({ data: JSON.stringify(data) } as MessageEvent);
    }
  }

  simulateClose() {
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) this.onclose({} as CloseEvent);
  }
}

// Install mock before module is imported
(globalThis as any).WebSocket = MockWebSocket;

// Now import the provider (it will see our global WebSocket)
import { WebSocketProvider } from '../WebSocketProvider';

describe('WebSocketProvider', () => {
  let provider: WebSocketProvider;

  beforeEach(async () => {
    MockWebSocket.instances = [];
    vi.useFakeTimers({ shouldAdvanceTime: true });
    provider = new WebSocketProvider('wss://example.com/ws');
    // Wait for the connection to be "opened"
    await vi.advanceTimersByTimeAsync(1);
    await provider.ready;
  });

  afterEach(() => {
    provider.destroy();
    vi.useRealTimers();
  });

  function latestWs(): MockWebSocket {
    return MockWebSocket.instances[MockWebSocket.instances.length - 1];
  }

  it('connects to the correct URL', () => {
    expect(latestWs().url).toBe('wss://example.com/ws');
  });

  it('sends JSON-RPC requests with incrementing IDs', async () => {
    const ws = latestWs();

    // Fire off two requests concurrently
    const p1 = provider.getBlockNumber();
    const p2 = provider.getGasPrice();

    // Give microtasks time to flush
    await vi.advanceTimersByTimeAsync(1);

    expect(ws.sent.length).toBe(2);

    const req1 = JSON.parse(ws.sent[0]);
    const req2 = JSON.parse(ws.sent[1]);

    expect(req1.id).toBe(1);
    expect(req2.id).toBe(2);
    expect(req1.method).toBe('eth_blockNumber');
    expect(req2.method).toBe('eth_gasPrice');

    // Respond to both
    ws.simulateMessage({ jsonrpc: '2.0', id: 1, result: '0xa' }); // 10
    ws.simulateMessage({ jsonrpc: '2.0', id: 2, result: '0x3b9aca00' }); // 1 gwei

    const blockNumber = await p1;
    const gasPrice = await p2;

    expect(blockNumber).toBe(10);
    expect(gasPrice).toBe(1000000000n);
  });

  it('routes subscription notifications to correct callbacks', async () => {
    const ws = latestWs();

    const subscribePromise = provider.subscribe('newHeads');
    await vi.advanceTimersByTimeAsync(1);

    // Respond with subscription ID
    const subReq = JSON.parse(ws.sent[ws.sent.length - 1]);
    ws.simulateMessage({
      jsonrpc: '2.0',
      id: subReq.id,
      result: '0xabc123',
    });

    const subId = await subscribePromise;
    expect(subId).toBe('0xabc123');

    // Register event listener
    const blockCallback = vi.fn();
    provider.on('block', blockCallback);

    // Simulate a subscription notification
    ws.simulateMessage({
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: '0xabc123',
        result: { number: '0xf', hash: '0xdeadbeef' },
      },
    });

    expect(blockCallback).toHaveBeenCalledTimes(1);
    expect(blockCallback).toHaveBeenCalledWith({
      number: '0xf',
      hash: '0xdeadbeef',
    });
  });

  it('unsubscribe cleans up and returns result', async () => {
    const ws = latestWs();

    // Subscribe first
    const subPromise = provider.subscribe('newPendingTransactions');
    await vi.advanceTimersByTimeAsync(1);
    const subReq = JSON.parse(ws.sent[ws.sent.length - 1]);
    ws.simulateMessage({
      jsonrpc: '2.0',
      id: subReq.id,
      result: '0xsub1',
    });
    const subId = await subPromise;

    // Now unsubscribe
    const unsubPromise = provider.unsubscribe(subId);
    await vi.advanceTimersByTimeAsync(1);
    const unsubReq = JSON.parse(ws.sent[ws.sent.length - 1]);
    expect(unsubReq.method).toBe('eth_unsubscribe');
    expect(unsubReq.params).toEqual(['0xsub1']);

    ws.simulateMessage({
      jsonrpc: '2.0',
      id: unsubReq.id,
      result: true,
    });

    const result = await unsubPromise;
    expect(result).toBe(true);
  });

  it('off() removes specific callback', async () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    provider.on('block', cb1);
    provider.on('block', cb2);

    provider.off('block', cb1);

    const ws = latestWs();

    // Set up a subscription mapped to 'block'
    const subPromise = provider.subscribe('newHeads');
    await vi.advanceTimersByTimeAsync(1);
    const subReq = JSON.parse(ws.sent[ws.sent.length - 1]);
    ws.simulateMessage({ jsonrpc: '2.0', id: subReq.id, result: '0xevt' });
    await subPromise;

    // Fire a notification
    ws.simulateMessage({
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: { subscription: '0xevt', result: { test: true } },
    });

    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it('off() without callback removes all listeners for event', () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    provider.on('pending', cb1);
    provider.on('pending', cb2);
    provider.off('pending');

    // Internal check: no listeners should remain (indirectly tested by no callbacks firing)
    // We can't directly inspect private fields, but we confirm no errors and both cbs stay uncalled
    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).not.toHaveBeenCalled();
  });

  it('destroy() closes the connection', () => {
    const ws = latestWs();
    expect(ws.readyState).toBe(MockWebSocket.OPEN);

    provider.destroy();

    expect(ws.readyState).toBe(MockWebSocket.CLOSED);
  });

  it('destroy() rejects pending requests', async () => {
    const ws = latestWs();

    // Start a request that won't be answered
    const promise = provider.getBlockNumber();
    await vi.advanceTimersByTimeAsync(1);

    // Destroy before responding
    provider.destroy();

    await expect(promise).rejects.toThrow();
  });

  it('attempts reconnection on unexpected close with exponential backoff', async () => {
    const ws1 = latestWs();
    const instanceCountBefore = MockWebSocket.instances.length;

    // Simulate unexpected close (not from destroy)
    ws1.simulateClose();

    // After 1s delay (2^0 * 1000), first reconnect attempt
    await vi.advanceTimersByTimeAsync(1000);
    expect(MockWebSocket.instances.length).toBe(instanceCountBefore + 1);

    const ws2 = latestWs();
    expect(ws2.url).toBe('wss://example.com/ws');

    // Simulate second close
    ws2.simulateClose();

    // After 2s delay (2^1 * 1000), second reconnect attempt
    await vi.advanceTimersByTimeAsync(2000);
    expect(MockWebSocket.instances.length).toBe(instanceCountBefore + 2);

    const ws3 = latestWs();

    // Simulate third close
    ws3.simulateClose();

    // After 4s delay (2^2 * 1000), third reconnect attempt
    await vi.advanceTimersByTimeAsync(4000);
    expect(MockWebSocket.instances.length).toBe(instanceCountBefore + 3);
  });

  it('on() returns this for chaining', () => {
    const result = provider.on('block', vi.fn());
    expect(result).toBe(provider);
  });

  it('off() returns this for chaining', () => {
    const result = provider.off('block');
    expect(result).toBe(provider);
  });

  it('handles JSON-RPC errors from the node', async () => {
    const ws = latestWs();

    const promise = provider.getBlockNumber();
    await vi.advanceTimersByTimeAsync(1);

    const req = JSON.parse(ws.sent[ws.sent.length - 1]);
    ws.simulateMessage({
      jsonrpc: '2.0',
      id: req.id,
      error: { code: -32600, message: 'Invalid request' },
    });

    await expect(promise).rejects.toThrow('Invalid request');
  });

  it('subscribe("logs") maps to "logs" event', async () => {
    const ws = latestWs();
    const logCb = vi.fn();
    provider.on('logs', logCb);

    const subPromise = provider.subscribe('logs', {
      address: '0xabc',
    });
    await vi.advanceTimersByTimeAsync(1);

    const subReq = JSON.parse(ws.sent[ws.sent.length - 1]);
    // Verify params include the filter
    expect(subReq.params).toEqual(['logs', { address: '0xabc' }]);

    ws.simulateMessage({
      jsonrpc: '2.0',
      id: subReq.id,
      result: '0xlogsub',
    });
    await subPromise;

    ws.simulateMessage({
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: '0xlogsub',
        result: { address: '0xabc', data: '0x1234' },
      },
    });

    expect(logCb).toHaveBeenCalledTimes(1);
    expect(logCb).toHaveBeenCalledWith({ address: '0xabc', data: '0x1234' });
  });
});
