import {useEffect, useRef} from 'react';

type DebouncedFn<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export const useDebounce = <T extends (...args: any[]) => void>(
  cb: T,
  delay = 500,
): DebouncedFn<T> => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback: DebouncedFn<T> = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  return debouncedCallback;
};
