import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Venue } from "../interfaces";

interface FilteredDataProps {
  filteredData: Venue[];

  setFilteredData: (
    newFilteredData: Venue[] | ((prevData: Venue[]) => Venue[])
  ) => void;
}

export const useFilteredDataStore = create<FilteredDataProps>()(
  devtools((set) => ({
    filteredData: [],
    setFilteredData: (newFilteredData) =>
      set((state) => ({
        filteredData:
          typeof newFilteredData === "function"
            ? newFilteredData(state.filteredData)
            : newFilteredData,
      })),
  }))
);
