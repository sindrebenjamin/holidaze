import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DateValueType } from "react-tailwindcss-datepicker";

interface FilterProps {
  queryString: string;
  dates: DateValueType;
  amenities: string[];
  maxGuests: number | null;
  adults: number;
  children: number;
  minimumRating: number;
  sliderValue: number[];
  setQueryString: (newQueryString: string) => void;
  setDates: (newDates: DateValueType) => void;
  setAmenities: (newAmenities: string[]) => void;
  setMaxGuests: (newMaxGuests: number | null) => void;
  setAdults: (newAdults: number) => void;
  setChildren: (newChildren: number) => void;
  setMinimumRating: (newMinimumRating: number) => void;
  setSliderValue: (newSliderValue: [number, number]) => void;
}

export const useFilterStore = create<FilterProps>()(
  devtools((set) => ({
    queryString: "",
    dates: {
      startDate: null,
      endDate: null,
    },
    amenities: [],
    maxGuests: null,
    adults: 0,
    children: 0,
    minimumRating: 0,
    sliderValue: [0, 10000],
    setQueryString: (newQueryString: string) =>
      set({ queryString: newQueryString }),
    setDates: (newDates: DateValueType) => set({ dates: newDates }),
    setAmenities: (newAmenities: string[]) => set({ amenities: newAmenities }),
    setMaxGuests: (newMaxGuests: number | null) =>
      set({ maxGuests: newMaxGuests }),
    setAdults: (newAdults: number) => set({ adults: newAdults }),
    setChildren: (newChildren: number) => set({ children: newChildren }),
    setMinimumRating: (newMinimumRating: number) =>
      set({ minimumRating: newMinimumRating }),
    setSliderValue: (newSliderValue: [number, number]) =>
      set({ sliderValue: newSliderValue }),
  }))
);
