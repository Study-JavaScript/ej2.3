import { memoize } from "./memoize";


describe('memoize', () => {
  it('should return the correct result for new arguments', () => {
    const mockFn = jest.fn((x) => x * 2);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(2)).toBe(4);
    expect(memoizedFn(3)).toBe(6);
    expect(memoizedFn(4)).toBe(8);

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should return cached result for previously seen arguments', () => {
    const mockFn = jest.fn((x) => x * 2);
    const memoizedFn = memoize(mockFn);

    memoizedFn(2);
    memoizedFn(2);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple arguments correctly', () => {
    const mockFn = jest.fn((a, b) => a + b);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(2, 3)).toBe(5);
    expect(memoizedFn(1, 2)).toBe(3);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should work with non-primitive arguments', () => {
    const mockFn = jest.fn((obj) => obj.value * 2);
    const memoizedFn = memoize(mockFn);

    const obj1 = { value: 2 };
    const obj2 = { value: 3 };

    expect(memoizedFn(obj1)).toBe(4);
    expect(memoizedFn(obj2)).toBe(6);
    expect(memoizedFn(obj1)).toBe(4);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should maintain context when called as a method', () => {
    const obj = {
      value: 2,
      getValue: function () {
        return this.value;
      },
    };

    obj.getValue = memoize(obj.getValue);

    expect(obj.getValue()).toBe(2);
    obj.value = 3;
    expect(obj.getValue()).toBe(2); 
  });

  it('should handle functions that return undefined correctly', () => {
    const mockFn = jest.fn(() => undefined);
    const memoizedFn = memoize(mockFn);

    expect(memoizedFn()).toBeUndefined();
    expect(memoizedFn()).toBeUndefined();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

