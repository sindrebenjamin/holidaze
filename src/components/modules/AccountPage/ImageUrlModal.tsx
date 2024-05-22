import { useState, ChangeEvent, useRef } from "react";

import { useUserStore } from "../../../store/useUserStore";
import { checkMedia } from "../../../utils/checkMedia";
import MediaInput from "../../MediaInput";
import Button from "../../Button";
import { ApiStatus } from "../../../interfaces";
import { basicApi } from "../../../utils/basicApi";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface ImageUrlModalProps {
  value: string | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  preview: string;
  setPreview: (preview: string) => void;
  saveTo: "banner" | "avatar";
  position: string;
  previewPosition: string;
  tipPosition: string;
}

const ImageUrlModal: React.FC<ImageUrlModalProps> = ({
  value,
  isOpen,
  setIsOpen,
  preview,
  setPreview,
  saveTo,
  position,
  previewPosition,
  tipPosition,
}) => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const user = useUserStore((state) => state.user);
  const [mediaUrl, setMediaUrl] = useState(value);
  const [errorMessage, setErrorMessage] = useState("");
  const wrapperRef = useRef(null);

  const isError = errorMessage ? true : false;

  useOutsideClick(wrapperRef, () => setIsOpen(false));

  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  const classes = isOpen
    ? `translate-y-0 opacity-1 z-10`
    : `translate-y-4 opacity-0 z-[-1]`;

  const baseOptions = {
    method: "PUT",
    headers: {
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    },
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setMediaUrl(e.target.value);
    (async () => {
      const checkImage = await checkMedia(e.target.value);
      const isMediaError =
        checkImage === "/public/nomedia.jpg" || checkImage.length > 300
          ? true
          : false;
      switch (isMediaError) {
        case checkImage.length > 300:
          setErrorMessage("Image URL cannot exceed 300 characters");
          break;
        case checkImage === "/public/nomedia.jpg":
          setErrorMessage("Must be a valid image URL");
          break;
      }
      if (!isMediaError) {
        setErrorMessage("");
        setPreview(e.target.value);
      }
    })();
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const options =
      saveTo === "banner"
        ? {
            ...baseOptions,
            body: JSON.stringify({
              banner: { url: mediaUrl },
            }),
          }
        : {
            ...baseOptions,
            body: JSON.stringify({
              avatar: { url: mediaUrl },
            }),
          };

    (async function () {
      await basicApi(
        `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}`,
        options,
        setApiStatus
      );
      setIsOpen(false);
      setPreview("");
    })();

    if (user) {
      switch (saveTo) {
        case "banner":
          useUserStore.setState({
            user: { ...user, banner: { ...user.banner, url: mediaUrl! } },
          });
          break;
        case "avatar":
          useUserStore.setState({
            user: { ...user, avatar: { ...user.avatar, url: mediaUrl! } },
          });
          break;
      }
    }
  }

  function handleDiscard() {
    setErrorMessage("");
    setMediaUrl(value);
    setPreview("");
  }

  return (
    <form
      ref={wrapperRef}
      onSubmit={handleSave}
      className={`${classes} ${
        preview && previewPosition
      } ${position} border-gray-300 border p-4 rounded-lg w-[290px] absolute bg-white transition-all duration-300 ease-out`}
    >
      <div
        className={`${tipPosition} absolute z-20 h-4 w-4 rotate-45 mt-0.5 border-l border-t border-gray-300 bg-white top-[-11px]`}
      ></div>
      <MediaInput
        value={mediaUrl!}
        disabled={false}
        onChange={handleChange}
        errorMessage={errorMessage}
        name="imageurl"
        label="Image URL"
        placeholder="https://images.com/image.jpg"
      />
      <div className="flex items-center justify-between mt-4">
        <Button
          disabled={mediaUrl === value}
          onClick={handleDiscard}
          type="button"
        >
          Discard
        </Button>
        <Button
          override="w-[74px]"
          type="submit"
          disabled={isError || mediaUrl === value}
          color="gray-dark"
          size="lg"
        >
          {apiStatus === "loading" ? (
            <div className="spinner-light spinner-sm"></div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
      <ul className="text-red-500 mt-2">
        {apiErrors &&
          apiErrors.map((error) => {
            return <li key={error.message}>{error.message}</li>;
          })}
      </ul>
      {preview && (
        <p className="text-gray-500 mt-4">You have unsaved changes</p>
      )}
    </form>
  );
};

export default ImageUrlModal;
