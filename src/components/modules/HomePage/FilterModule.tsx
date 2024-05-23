import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useFilterStore } from "../../../store/useFilterStore";
import AmenityCard from "../../AmenityCard";
import NumberSelector from "../../NumberSelector";
import RatingSelector from "../../RatingSelector";

const FilterModule = () => {
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
    let { value, min, max } = event.target;
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
      {/* Slider */}
      <RangeSlider
        id="holidaze-slider"
        value={sliderValue}
        onInput={setSliderValue}
        step={100}
        max={20000}
      />
      <input
        type="number"
        value={sliderValue[0]}
        min={0}
        max={sliderValue[1] - 100}
        onChange={(e) => setSliderValue([+e.target.value, sliderValue[1]])}
        onBlur={(e) => handleInputChange(e, "left")}
      />
      <input
        type="number"
        value={sliderValue[1]}
        min={sliderValue[0] + 100}
        max={20000}
        step={100}
        onChange={(e) => setSliderValue([sliderValue[0], +e.target.value])}
        onBlur={(e) => handleInputChange(e, "right")}
      />
      {/* Amenities */}
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
      {/* Max guests */}
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
      {/* Minimum rating */}
      <RatingSelector rating={minimumRating} setRating={setMinimumRating} />
    </>
  );
};

export default FilterModule;
