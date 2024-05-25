import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FilterProps {
  amenities: string[];
  maxGuests: number | null;
  minimumRating: number;
  sliderValue: number[];
  setAmenities: (newAmenities: string[]) => void;
  setMaxGuests: (newMaxGuests: number | null) => void;
  setMinimumRating: (newMinimumRating: number) => void;
  setSliderValue: (newSliderValue: [number, number]) => void;
}

export const useFilterStore = create<FilterProps>()(
  devtools((set) => ({
    amenities: [],
    maxGuests: null,
    minimumRating: 0,
    sliderValue: [0, 12000],
    setAmenities: (newAmenities: string[]) => set({ amenities: newAmenities }),
    setMaxGuests: (newMaxGuests: number | null) =>
      set({ maxGuests: newMaxGuests }),
    setMinimumRating: (newMinimumRating: number) =>
      set({ minimumRating: newMinimumRating }),
    setSliderValue: (newSliderValue: [number, number]) =>
      set({ sliderValue: newSliderValue }),
  }))
);
