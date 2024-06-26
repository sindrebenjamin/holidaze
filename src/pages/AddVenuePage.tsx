import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { FormH1 } from "../components/TailwindComponents";
import Tabs from "../components/Tabs";
import { checkMedia } from "../utils/checkMedia";
import { VenueFormData, ApiStatus } from "../interfaces";
import { useUserStore } from "../store/useUserStore";
import { basicApi } from "../utils/basicApi";

import LocationModule from "../components/modules/Tabs/LocationModule";
import DescriptionModule from "../components/modules/Tabs/DescriptionModule";
import DetailsModule from "../components/modules/Tabs/DetailsModule";
import AmenitiesModule from "../components/modules/Tabs/AmenitiesModule";
import MediaModule from "../components/modules/Tabs/MediaModule";
import PublishModule from "../components/modules/Tabs/PublishModule";
import useLastPageStore from "../store/useLastPageStore";
import { useAccountDialogueStore } from "../store/useAccountDialogueStore";

let nextId = 1;

type MediaArrayItem = {
  id: number;
  url: string;
};

const schema = yup.object({
  address: yup.string().required("Please enter the address of your venue"),
  title: yup.string().required("Please include a title for your venue"),
  price: yup
    .number()
    .max(10000, "Price cannot be greater than 10,000")
    .typeError("Price must be a numerical value")
    .required("Please include the price per night for your venue"),
});

const AddVenuePage = () => {
  const { setAnimationTrigger, setMessage } = useAccountDialogueStore(
    (state) => ({
      setAnimationTrigger: state.setAnimationTrigger,
      setMessage: state.setMessage,
    })
  );
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VenueFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const setLastPath = useLastPageStore((state) => state.setLastPath);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentMediaString, setCurrentMediaString] = useState("");
  const [mediaErrorMessage, setMediaErrorMessage] = useState("");
  const [mediaArray, setMediaArray] = useState<MediaArrayItem[]>([]);

  const watchedFields = watch(["title", "address", "price"]);
  const priceCheck = !watchedFields[2] || watchedFields[2] > 10000;

  const mediaData = mediaArray.map((media) => {
    return {
      url: media.url,
    };
  });

  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  function onSubmit(data: VenueFormData) {
    const options = {
      method: "POST",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        description: data.description,
        media: mediaData,
        price: data.price,
        maxGuests: quantity,
        rating: rating,
        meta: {
          wifi: selectedAmenities.includes("wifi"),
          parking: selectedAmenities.includes("parking"),
          breakfast: selectedAmenities.includes("breakfast"),
          pets: selectedAmenities.includes("pets"),
        },
        location: {
          address: data.address,
          city: data.city,
          zip: data.zip,
          country: data.country,
          continent: data.continent,
        },
      }),
    };
    (async () => {
      const result = await basicApi(
        "https://v2.api.noroff.dev/holidaze/venues",
        options,
        setApiStatus
      );
      setLastPath("/add");
      navigate(`/account`);
      setMessage(`Venue ${result.data.name} was created`);
      setAnimationTrigger(false);
    })();
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

    (async () => {
      const checkImage = await checkMedia(value);
      const isError =
        checkImage === "/nomedia.jpg" || checkImage.length > 300 ? true : false;
      switch (isError) {
        case checkImage.length > 300:
          setMediaErrorMessage("Image URL cannot exceed 300 characters");
          break;
        case checkImage === "/nomedia.jpg":
          setMediaErrorMessage("Must be a valid image URL");
          break;
      }
      if (!isError) {
        setMediaArray([...mediaArray, { id: nextId++, url: value }]);
        setCurrentMediaString("");
        setMediaErrorMessage("");
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
      content: <LocationModule errors={errors} register={register} />,
      lock: false,
      lockMessage: "Add address to proceed",
    },
    {
      title: "Description",
      id: 2,
      lock: !watchedFields[1],
      lockMessage: "Add title to proceed",
      content: <DescriptionModule errors={errors} register={register} />,
    },
    {
      title: "Details",
      id: 3,
      lock: !watchedFields[0] || !watchedFields[1],
      lockMessage: "Add price to proceed",
      content: (
        <DetailsModule
          errors={errors}
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

      lock: priceCheck || !watchedFields[0] || !watchedFields[1],
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
      lock: priceCheck || !watchedFields[0] || !watchedFields[1],
      lockMessage: "Add at least one photo to proceed",
      content: (
        <MediaModule
          currentMediaString={currentMediaString}
          handleMediaStringOnChange={handleMediaStringOnChange}
          mediaErrorMessage={mediaErrorMessage}
          mediaArray={mediaArray}
          handleMoveImage={handleMoveImage}
          handleRemoveImage={handleRemoveImage}
        />
      ),
    },
    {
      title: "Publish",
      id: 6,
      lock:
        mediaArray.length === 0 ||
        priceCheck ||
        !watchedFields[0] ||
        !watchedFields[1],
      content: <PublishModule apiStatus={apiStatus} apiErrors={apiErrors} />,
    },
  ];
  return (
    <>
      <Helmet>
        <title>Holidaze | Add Venue</title>
      </Helmet>
      <main className="md:bg-gray-50 md:flex md:flex-col md:justify-center md:items-center md:min-h-screen md:px-6 md:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[1000px] bg-white w-full py-12 min-h-screen md:min-h-0 md:p-10 lg:p-[60px] md:rounded-lg md:shadow-md overflow-hidden"
        >
          <FormH1 className="mb-6 md:mb-8 px-4 sm:px-6 md:px-0">
            List Venue
          </FormH1>
          <Tabs tabs={tabsData} />
        </form>
      </main>
    </>
  );
};

export default AddVenuePage;
