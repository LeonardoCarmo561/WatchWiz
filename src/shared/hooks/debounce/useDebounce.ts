import { useCallback, useRef, useState } from "react";

export function useDebounce(time: number = 500, firstTimeDelay: boolean = false) {
  const debouncing = useRef<NodeJS.Timeout>();
  const firstTime = useRef(!firstTimeDelay)

  const debounce = useCallback((func: () => void) => {
      if (firstTime.current) {
        firstTime.current = false
        func()
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => func(), time);
      }
  }, [time])

  return {
    debounce
  }
}
