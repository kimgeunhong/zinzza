import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    const id = window.setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);
    return () => window.clearInterval(id);
  }, [delay]);
}
