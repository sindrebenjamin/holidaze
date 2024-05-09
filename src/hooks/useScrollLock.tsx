import { useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
}
