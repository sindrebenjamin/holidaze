import { useEffect, RefObject } from "react";

/**
 * Custom hook to detect clicks outside a specified element.
 *
 * @function useOutsideClick
 * @param ref - The reference to the element to detect outside clicks.
 * @param callback - The callback function to execute when an outside click is detected.
 */

export function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
