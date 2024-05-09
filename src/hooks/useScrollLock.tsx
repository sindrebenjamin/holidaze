import { useEffect } from "react";

export function useScrollLock(modalIsOpen: boolean) {
  useEffect(() => {
    document.body.style.overflow = modalIsOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);
}
