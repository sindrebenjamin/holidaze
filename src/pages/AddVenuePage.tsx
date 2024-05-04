import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormH1 } from "../components/TailwindComponents";
import Tabs from "../components/Tabs";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";
import QuantitySelector from "../components/QuantitySelector";
import RatingSelector from "../components/RatingSelector";
import AmenityCard from "../components/AmenityCard";

const AddVenuePage = () => {
  const { register, handleSubmit } = useForm();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  function handleAmenityClick(amenity: string) {
    if (!selectedAmenities.includes(amenity)) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      const nextAmenities = selectedAmenities.filter((a) => a !== amenity);
      setSelectedAmenities(nextAmenities);
    }
    console.log(selectedAmenities);
  }

  const locationContent = (
    <div className="max-w-[500px]">
      <InputAndLabelAndMessage
        name="address"
        label="Address"
        placeholder="123 Main St, Apt 4"
        register={register}
        type="text"
      />
    </div>
  );
  const tabsData = [
    { title: "Location", id: 1, content: locationContent },
    { title: "Description", id: 2, content: <p>Description</p> },
    { title: "Details", id: 3, content: <p>Details</p> },
    { title: "Amenities", id: 4, content: <p>Amenities</p> },
    { title: "Media", id: 5, content: <p>Amenities</p> },
    { title: "Publish", id: 6, content: <p>Amenities</p> },
  ];
  return (
    <main className="md:bg-gray-50 md:flex md:flex-col md:justify-center md:items-center md:min-h-screen md:px-6 md:py-12">
      <div className="max-w-[1000px] bg-white w-full py-12 min-h-screen md:min-h-0 md:p-10 lg:p-[60px] md:rounded-lg md:shadow-md overflow-hidden">
        <FormH1 className="mb-6 md:mb-8 px-4 md:px-0">List Venue</FormH1>
        <Tabs tabs={tabsData} />
        <QuantitySelector quantity={quantity} handleQuantity={setQuantity} />
        <RatingSelector rating={rating} setRating={setRating} />
        <AmenityCard
          onClick={() => handleAmenityClick("parking")}
          title="Parking"
          selected={selectedAmenities.includes("parking")}
          icon="car"
        />
        <AmenityCard
          onClick={() => handleAmenityClick("wifi")}
          title="Wifi"
          selected={selectedAmenities.includes("wifi")}
          icon="wifi"
        />
      </div>
    </main>
  );
};

export default AddVenuePage;
