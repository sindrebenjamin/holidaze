import { create } from "zustand";

interface AccountDialogueProps {
  animationTrigger: boolean | null;
  message: string;
  setAnimationTrigger: (trigger: boolean | null) => void;
  setMessage: (newMessage: string) => void;
}

export const useAccountDialogueStore = create<AccountDialogueProps>((set) => ({
  animationTrigger: null,
  message: "",
  setAnimationTrigger: (trigger: boolean | null) =>
    set({ animationTrigger: trigger }),
  setMessage: (newMessage: string) => set({ message: newMessage }),
}));
