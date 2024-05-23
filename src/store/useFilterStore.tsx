import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FilterProps {
  amenities: string[];
  maxGuests: number;
  minimumRating: number;
  sliderValue: number[];
  setAmenities: (newAmenities: string[]) => void;
  setMaxGuests: (newMaxGuests: number) => void;
  setMinimumRating: (newMinimumRating: number) => void;
  setSliderValue: (newSliderValue: [number, number]) => void;
}

export const useFilterStore = create<FilterProps>()(
  devtools((set) => ({
    amenities: [],
    maxGuests: 6,
    minimumRating: 0,
    sliderValue: [300, 6000],
    setAmenities: (newAmenities: string[]) => set({ amenities: newAmenities }),
    setMaxGuests: (newMaxGuests: number) => set({ maxGuests: newMaxGuests }),
    setMinimumRating: (newMinimumRating: number) =>
      set({ minimumRating: newMinimumRating }),
    setSliderValue: (newSliderValue: [number, number]) =>
      set({ sliderValue: newSliderValue }),
  }))
);
