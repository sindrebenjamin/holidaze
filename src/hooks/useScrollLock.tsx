import { useEffect } from "react";

/**
 * Custom hook to lock or unlock the body scroll based on the provided flag.
 *
 * @function useScrollLock
 * @param isLocked - Flag indicating whether the scroll should be locked or unlocked.
 */

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
}
