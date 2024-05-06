import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormH1 } from "../components/TailwindComponents";
import Tabs from "../components/Tabs";
import { checkMedia } from "../utils/checkMedia";
import { VenueFormData } from "../interfaces";

import LocationModule from "../components/modules/Tabs/LocationModule";
import DescriptionModule from "../components/modules/Tabs/DescriptionModule";
import DetailsModule from "../components/modules/Tabs/DetailsModule";
import AmenitiesModule from "../components/modules/Tabs/AmenitiesModule";
import MediaModule from "../components/modules/Tabs/MediaModule";

let nextId = 1;

type MediaArrayItem = {
  id: number;
  url: string;
};

const AddVenuePage = () => {
  const { register, handleSubmit } = useForm<VenueFormData>();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentMediaString, setCurrentMediaString] = useState("");
  const [isMediaError, setIsMediaError] = useState(false);
  const [mediaArray, setMediaArray] = useState<MediaArrayItem[]>([]);

  function onSubmit(data) {
    console.log(data);
  }

  function handleMoveImage(dragIndex: number, hoverIndex: number): void {
    const dragImage = mediaArray[dragIndex];
    const newImages = [...mediaArray];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, dragImage);
    setMediaArray(newImages);
  }

  function handleRemoveImage(imageId: number) {
    const nextImages = mediaArray.filter((img) => img.id !== imageId);
    setMediaArray(nextImages);
  }

  function handleMediaStringOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCurrentMediaString(value);
    console.log(value);
    (async () => {
      const checkImage = await checkMedia(value);
      const isError = checkImage === "/public/nomedia.jpg" ? true : false;
      setIsMediaError(isError);
      if (!isError) {
        setMediaArray([...mediaArray, { id: nextId++, url: value }]);
        setCurrentMediaString("");
      }
    })();
  }

  function handleAmenityClick(amenity: string) {
    if (!selectedAmenities.includes(amenity)) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      const nextAmenities = selectedAmenities.filter((a) => a !== amenity);
      setSelectedAmenities(nextAmenities);
    }
  }

  const tabsData = [
    {
      title: "Location",
      id: 1,
      content: <LocationModule register={register} />,
    },
    {
      title: "Description",
      id: 2,
      content: <DescriptionModule register={register} />,
    },
    {
      title: "Details",
      id: 3,
      content: (
        <DetailsModule
          quantity={quantity}
          setQuantity={setQuantity}
          rating={rating}
          setRating={setRating}
          register={register}
        />
      ),
    },
    {
      title: "Amenities",
      id: 4,
      content: (
        <AmenitiesModule
          selectedAmenities={selectedAmenities}
          handleAmenityClick={handleAmenityClick}
        />
      ),
    },
    {
      title: "Media",
      id: 5,
      content: (
        <MediaModule
          currentMediaString={currentMediaString}
          handleMediaStringOnChange={handleMediaStringOnChange}
          isMediaError={isMediaError}
          mediaArray={mediaArray}
          handleMoveImage={handleMoveImage}
          handleRemoveImage={handleRemoveImage}
        />
      ),
    },
    { title: "Publish", id: 6, content: <p>Amenities</p> },
  ];
  return (
    <main className="md:bg-gray-50 md:flex md:flex-col md:justify-center md:items-center md:min-h-screen md:px-6 md:py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1000px] bg-white w-full py-12 min-h-screen md:min-h-0 md:p-10 lg:p-[60px] md:rounded-lg md:shadow-md overflow-hidden"
      >
        <FormH1 className="mb-6 md:mb-8 px-4 md:px-0">List Venue</FormH1>
        <Tabs tabs={tabsData} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default AddVenuePage;
