import { useForm } from "react-hook-form";
import { useState, useMemo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

import { Divider, FormH1 } from "../components/TailwindComponents";
import Tabs from "../components/Tabs";
import { checkMedia } from "../utils/checkMedia";
import { VenueFormData, ApiStatus, ApiOptions } from "../interfaces";
import { useUserStore } from "../store/useUserStore";
import { basicApi } from "../utils/basicApi";

import LocationModule from "../components/modules/Tabs/LocationModule";
import DescriptionModule from "../components/modules/Tabs/DescriptionModule";
import DetailsModule from "../components/modules/Tabs/DetailsModule";
import AmenitiesModule from "../components/modules/Tabs/AmenitiesModule";
import MediaModule from "../components/modules/Tabs/MediaModule";

import { SingleVenueResponse } from "../interfaces";
import { useApi } from "../hooks/useApi";
import Bookings from "../components/modules/EditPage/Bookings";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import WarningModal from "../components/WarningModal";
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

const EditVenuePage = () => {
  const { setAnimationTrigger, setMessage } = useAccountDialogueStore(
    (state) => ({
      setAnimationTrigger: state.setAnimationTrigger,
      setMessage: state.setMessage,
    })
  );
  const params = useParams();
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data, status } = useApi<SingleVenueResponse>(
    "https://v2.api.noroff.dev/holidaze/venues/" +
      params.id +
      "?_bookings=true",
    options
  );

  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const user = useUserStore((state) => state.user);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VenueFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);
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

  useEffect(() => {
    if (data) {
      setValue("address", data?.data.location.address ?? "");
      setValue("city", data?.data.location.city ?? "");
      setValue("zip", data?.data.location.zip ?? "");
      setValue("country", data?.data.location.country ?? "");
      setValue("continent", data?.data.location.continent ?? "");
      setValue("title", data?.data.name ?? "");
      setValue("description", data?.data.description ?? "");
      setValue("price", data?.data.price ?? "");

      setQuantity(data.data.maxGuests);
      setRating(data.data.rating);

      const trueAmenities = Object.entries(data.data.meta)
        .filter(([, value]) => value === true)
        .map(([key]) => key);

      setSelectedAmenities(trueAmenities);

      const uploadedMedia = data.data.media.map((media, index) => {
        return {
          id: index,
          url: media.url,
        };
      });

      setMediaArray(uploadedMedia);
    }
  }, [data, setValue]);

  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  const apiHeaders = {
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    Authorization: `Bearer ${user?.accessToken}`,
    "Content-Type": "application/json",
  };

  async function modifyVenue(options: ApiOptions) {
    await basicApi(
      "https://v2.api.noroff.dev/holidaze/venues/" + params.id,
      options,
      setApiStatus
    );
    navigate("/account");
    setMessage(`Venue ${data?.data.name} was updated`);
    setAnimationTrigger(false);
  }

  function onSubmit(data: VenueFormData) {
    const options = {
      method: "PUT",
      headers: apiHeaders,
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
          county: data.country,
          continent: data.continent,
        },
      }),
    };
    modifyVenue(options);
  }

  function handleDelete() {
    const options = {
      method: "DELETE",
      headers: apiHeaders,
    };
    modifyVenue(options);
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
      content: (
        <LocationModule
          hideTitle={data ? true : false}
          errors={errors}
          register={register}
        />
      ),
      lock: false,
      lockMessage: "Venue must have an address",
      errorFlag: !watchedFields[1],
    },
    {
      title: "Description",
      id: 2,
      lock: !watchedFields[1],
      errorFlag: !watchedFields[0],
      lockMessage: "Venue must have a title",
      content: (
        <DescriptionModule
          hideTitle={data ? true : false}
          errors={errors}
          register={register}
        />
      ),
    },
    {
      title: "Details",
      id: 3,
      lock: !watchedFields[0] || !watchedFields[1],
      errorFlag: priceCheck,
      lockMessage: "Venue must have a price per night",
      content: (
        <DetailsModule
          hideTitle={data ? true : false}
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
          hideTitle={data ? true : false}
          selectedAmenities={selectedAmenities}
          handleAmenityClick={handleAmenityClick}
        />
      ),
    },
    {
      title: "Media",
      id: 5,
      lock: priceCheck || !watchedFields[0] || !watchedFields[1],
      errorFlag: mediaArray.length === 0,
      lockMessage: "Venue must at least have one photo",
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
  ];

  if (status === "loading") {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <div className="spinner-dark"></div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <p>Something went wrong</p>
      </main>
    );
  }
  if (data) {
    return (
      <>
        <div className="items-start w-full hidden md:flex lg:hidden pt-4 pb-6 px-4 bg-gray-50">
          <BackButton />
        </div>
        <main className="md:bg-gray-50 md:flex md:flex-col md:justify-center md:items-center min-h-screen md:px-6 md:py-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[1000px] bg-white w-full py-12 min-h-screen md:min-h-0 md:p-10 lg:p-[60px] md:rounded-lg md:shadow-md overflow-hidden"
          >
            <div className="lg:hidden flex justify-between items-center pr-4 pl-1 sm:pl-3 mb-6 mt-4 md:hidden">
              <BackButton />

              <Button
                disabled={
                  mediaArray.length === 0 ||
                  priceCheck ||
                  !watchedFields[0] ||
                  !watchedFields[1]
                }
                type="submit"
                color="gray-light"
                size="sm"
              >
                Save and update
              </Button>
            </div>
            <div>
              <div className="flex items-start justify-between">
                <FormH1 className="mb-6 md:mb-8 px-4 sm:px-6 md:px-0">
                  {data?.data.name}
                </FormH1>
                <Button
                  disabled={
                    mediaArray.length === 0 ||
                    priceCheck ||
                    !watchedFields[0] ||
                    !watchedFields[1]
                  }
                  override="hidden md:block"
                  type="submit"
                  color="gray-light"
                  size="sm"
                >
                  Save and update
                </Button>
              </div>

              <div className="lg:hidden">
                <Bookings venue={data?.data} />
              </div>

              <Tabs tabs={tabsData} venue={data?.data} />
            </div>
            <ul>
              {apiErrors &&
                apiErrors.map((error) => {
                  return (
                    <li className="text-red-500" key={error.message}>
                      {error.message}
                    </li>
                  );
                })}
            </ul>
            <div className="px-4 sm:px-6 md:px-0 flex flex-col gap-6 mt-6">
              <Divider />
              <Button
                onClick={() => setWarningModalIsOpen(true)}
                size="lg"
                color="pink"
                type="button"
                override="sm:w-fit"
              >
                Delete venue
              </Button>
            </div>
          </form>
        </main>
        <WarningModal
          onConfirm={handleDelete}
          onCloseModal={() => setWarningModalIsOpen(false)}
          modalIsOpen={warningModalIsOpen}
        >
          Are you sure you want to delete this listing?
        </WarningModal>
      </>
    );
  }
};

export default EditVenuePage;
