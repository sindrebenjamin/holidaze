import { create } from "zustand";

interface LastPageProps {
  lastPath: string;
  setLastPath: (path: string) => void;
}

const useLastPageStore = create<LastPageProps>((set) => ({
  lastPath: "/",
  setLastPath: (path: string) => set({ lastPath: path }),
}));

export default useLastPageStore;
