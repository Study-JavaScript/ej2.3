export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache: Record<string, ReturnType<T>> = {};
    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
      const key = JSON.stringify(args);
      if (key in cache) {
        return cache[key];
      }
      const result = fn.apply(this, args);
      cache[key] = result;
      return result;
    } as T;
  }
  

