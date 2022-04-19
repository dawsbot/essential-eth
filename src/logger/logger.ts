import { version } from './package-version';
class Logger {
  private packageVersion: string;
  constructor() {
    this.packageVersion = version;
  }
  public throwError(message: string, args: { [key: string]: any }): never {
    const argsLength = Object.keys(args).length;
    throw new Error(
      `${message} (${Object.entries(args).map(
        ([key, value], index) =>
          `${key}=${value}${index < argsLength - 1 && ', '}`,
      )}, version=essential-eth@${this.packageVersion})`,
    );
  }
  public throwArgumentError(message: string, arg: string, value: any): never {
    throw new Error(
      `${message} (argument="${arg}" value=${value}, version=essential-eth@${this.packageVersion})`,
    );
  }
  public checkSafeUint53(value: number, message = 'value not safe'): void {
    if (typeof value !== 'number') {
      return;
    }

    if (value < 0 || value >= 0x1fffffffffffff) {
      this.throwError(message, {
        operation: 'checkSafeInteger',
        fault: 'out-of-safe-range',
        value: value,
      });
    }

    if (value % 1) {
      this.throwError(message, {
        operation: 'checkSafeInteger',
        fault: 'non-integer',
        value: value,
      });
    }
  }
}

export const logger = new Logger();
