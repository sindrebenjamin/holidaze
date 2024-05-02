import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import { User } from "../interfaces";

interface UserState {
  user: User | null;
  updateUser: (newUser: User) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        updateUser: (newUser: User) => set({ user: newUser }),
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
