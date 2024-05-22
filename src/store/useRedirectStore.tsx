import { create } from "zustand";

interface redirectProps {
  redirect: string;
  setRedirect: (path: string) => void;
}

export const useRedirectStore = create<redirectProps>((set) => ({
  redirect: "/",
  setRedirect: (path: string) => set({ redirect: path }),
}));
