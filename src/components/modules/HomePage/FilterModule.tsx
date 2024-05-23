import { useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useFilterStore } from "../../../store/useFilterStore";
import AmenityCard from "../../AmenityCard";
import NumberSelector from "../../NumberSelector";
import RatingSelector from "../../RatingSelector";
import BasicModal from "../../BasicModal";
import { Divider } from "../../TailwindComponents";
import Button from "../../Button";

const FilterModule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const { setAmenities, setMaxGuests, setMinimumRating, setSliderValue } =
    useFilterStore((state) => ({
      setAmenities: state.setAmenities,
      setMaxGuests: state.setMaxGuests,
      setMinimumRating: state.setMinimumRating,
      setSliderValue: state.setSliderValue,
    }));

  const { amenities, maxGuests, minimumRating, sliderValue } = useFilterStore(
    (state) => ({
      amenities: state.amenities,
      maxGuests: state.maxGuests,
      minimumRating: state.minimumRating,
      sliderValue: state.sliderValue,
    })
  );

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) {
    const { value, min, max } = event.target;
    const newValue = +value > +max ? +max : +value < +min ? min : +value;
    if (input === "left") {
      setSliderValue([+newValue, sliderValue[1]]);
    } else {
      setSliderValue([sliderValue[0], +newValue]);
    }
  }

  function handleAmenityClick(amenity: string) {
    if (!amenities.includes(amenity)) {
      setAmenities([...amenities, amenity]);
    } else {
      const nextAmenities = amenities.filter((a) => a !== amenity);
      setAmenities(nextAmenities);
    }
  }

  return (
    <>
      <button onClick={() => setAmenities(["test5", "test62"])}>update</button>
      {modalIsOpen && (
        <BasicModal
          modalFooter={
            <div className="flex justify-between items-center pt-4 border-t border-gray-300">
              <button className="underline text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Clear all
              </button>
              <Button size="xl" color="gray-dark" type="button">
                Show x venues
              </Button>
            </div>
          }
          modalIsOpen={modalIsOpen}
          onCloseModal={() => setModalIsOpen(false)}
          title="Filter"
        >
          <div className="flex flex-col gap-6">
            {/* Slider */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Price per night</h2>
              <RangeSlider
                id="holidaze-slider"
                value={sliderValue}
                onInput={setSliderValue}
                step={100}
                max={20000}
              />
              <div className="flex gap-3 items-center">
                <PriceInput
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                  handleInputChange={handleInputChange}
                  inputSide={"left"}
                />
                <div className="h-[1px] bg-gray-400 w-12"></div>
                <PriceInput
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                  handleInputChange={handleInputChange}
                  inputSide={"right"}
                />
              </div>
            </div>
            <Divider />
            {/* Amenities */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                <AmenityCard
                  onClick={() => handleAmenityClick("parking")}
                  title="Parking"
                  selected={amenities.includes("parking")}
                  icon="car"
                />
                <AmenityCard
                  onClick={() => handleAmenityClick("wifi")}
                  title="Wifi"
                  selected={amenities.includes("wifi")}
                  icon="wifi"
                />
                <AmenityCard
                  onClick={() => handleAmenityClick("pets")}
                  title="Pets allowed"
                  selected={amenities.includes("pets")}
                  icon="dog"
                />
                <AmenityCard
                  onClick={() => handleAmenityClick("breakfast")}
                  title="breakfast"
                  selected={amenities.includes("breakfast")}
                  icon="coffee"
                />
              </div>
            </div>
            <Divider />
            {/* Max guests */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Guests</h2>
              <div className="grid grid-cols-3 gap-2">
                <NumberSelector
                  onClick={() => setMaxGuests(1)}
                  selected={maxGuests === 1}
                >
                  1
                </NumberSelector>
                <NumberSelector
                  onClick={() => setMaxGuests(2)}
                  selected={maxGuests === 2}
                >
                  2
                </NumberSelector>
                <NumberSelector
                  onClick={() => setMaxGuests(3)}
                  selected={maxGuests === 3}
                >
                  3
                </NumberSelector>
                <NumberSelector
                  onClick={() => setMaxGuests(4)}
                  selected={maxGuests === 4}
                >
                  4
                </NumberSelector>
                <NumberSelector
                  onClick={() => setMaxGuests(5)}
                  selected={maxGuests === 5}
                >
                  5
                </NumberSelector>
                <NumberSelector
                  onClick={() => setMaxGuests(6)}
                  selected={maxGuests === 6}
                >
                  6+
                </NumberSelector>
              </div>
            </div>
            <Divider />
            {/* Minimum rating */}
            <div className="flex flex-col gap-4 pb-4">
              <h2 className="text-xl">Minimum rating</h2>
              <RatingSelector
                rating={minimumRating}
                setRating={setMinimumRating}
              />
            </div>
          </div>
        </BasicModal>
      )}
    </>
  );
};

export default FilterModule;

interface PriceInputProps {
  sliderValue: number[];
  setSliderValue: (value: [number, number]) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => void;
  inputSide: "left" | "right";
}

const PriceInput: React.FC<PriceInputProps> = ({
  sliderValue,
  setSliderValue,
  handleInputChange,
  inputSide,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (inputSide === "left") {
      setSliderValue([+e.target.value, sliderValue[1]]);
    } else {
      setSliderValue([sliderValue[0], +e.target.value]);
    }
  }
  return (
    <div
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setIsFocused(true);
        }
      }}
      className={`${
        isFocused ? "border-gray-800" : "border-gray-300"
      } flex flex-col w-full rounded-lg border border-gray-300 bg-gray-50 py-4 px-3.5`}
    >
      <label className="text-gray-500" htmlFor={`${inputSide}-range-input`}>
        {inputSide === "left" ? "Min" : "Max"}
      </label>
      <input
        ref={inputRef}
        className="outline-none bg-transparent"
        name={`${inputSide}-range-input`}
        id={`${inputSide}-range-input`}
        type="number"
        value={inputSide === "left" ? sliderValue[0] : sliderValue[1]}
        min={inputSide === "left" ? 0 : sliderValue[0] + 100}
        max={inputSide === "left" ? sliderValue[1] - 100 : 20000}
        onChange={(e) => handleOnChange(e)}
        onBlur={(e) => {
          handleInputChange(e, inputSide);
          setIsFocused(false);
        }}
      />
    </div>
  );
};