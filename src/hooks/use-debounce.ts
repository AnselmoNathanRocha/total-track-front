import { useCallback, useEffect, useRef } from "react";

type DebouncedFn<T extends unknown[]> = (...args: T) => void;

export function useDebounce<T extends unknown[]>(
  fn: DebouncedFn<T>,
  delay: number,
): DebouncedFn<T> {
  const timeoutRef = useRef<null | number>(null);

  const debouncedFn = useCallback(
    (...args: T) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [fn, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
