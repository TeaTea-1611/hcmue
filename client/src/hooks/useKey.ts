import { useEffect } from "react";

export const useCtrlKey = (key: string, callback: Function) => {
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.key === key && event.ctrlKey) {
        event.preventDefault();
        callback(event);
      }
    }

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, [key, callback]);
};

export const useAltKey = (key: string, callback: Function) => {
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.key === key && event.altKey) {
        event.preventDefault();
        callback(event);
      }
    }

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, [key, callback]);
};
