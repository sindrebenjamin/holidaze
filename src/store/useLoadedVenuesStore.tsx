import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import { Venue } from "../interfaces";

interface loadedVenuesState {
  loadedVenues: Venue[];
  setLoadedVenues: (newVenues: Venue[]) => void;
}

export const useLoadedVenuesStore = create<loadedVenuesState>()(
  devtools(
    persist(
      (set) => ({
        loadedVenues: [],
        setLoadedVenues: (newVenues: Venue[]) =>
          set({ loadedVenues: newVenues }),
      }),
      {
        name: "venue-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
