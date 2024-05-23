import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useFilterStore } from "../../../store/useFilterStore";

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

  return (
    <>
      <button onClick={() => setAmenities(["test5", "test62"])}>update</button>
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
    </>
  );
};

export default FilterModule;
