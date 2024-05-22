import { useState } from "react";

import { useScrollLock } from "../../hooks/useScrollLock";
import { MediaItem } from "../../interfaces";
import SlideShowModal from "./SlideShowModal";
import { useCheckMultipleMedia } from "../../hooks/useCheckMultipleMedia";

const DesktopSlideShow = ({ images }: { images: MediaItem[] | undefined }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const checkedMedia = useCheckMultipleMedia(images);

  useScrollLock(modalIsOpen);

  return (
    <>
      {modalIsOpen && (
        <SlideShowModal
          onClick={() => setModalIsOpen(false)}
          images={checkedMedia}
        />
      )}
      <ImageDisplay
        images={checkedMedia}
        onClick={() => setModalIsOpen(true)}
        heightClass="h-[600px]"
      />
    </>
  );
};

export default DesktopSlideShow;

const ImageDisplay = ({
  images,
  heightClass,
  onClick,
}: {
  images: MediaItem[] | undefined;
  heightClass: string;
  onClick: () => void;
}) => {
  if (images) {
    if (images.length === 1) {
      return (
        <div
          onClick={onClick}
          className={`relative ${heightClass} object-cover rounded-lg cursor-zoom-in w-full overflow-hidden`}
        >
          <ImageItem image={images[0]} />
        </div>
      );
    }
    if (images.length === 2) {
      return (
        <div
          onClick={onClick}
          className={`${heightClass} grid grid-cols-3 gap-2 rounded-lg overflow-hidden cursor-zoom-in`}
        >
          <div className="relative w-full h-full col-span-2">
            <ImageItem image={images[0]} />
          </div>
          <div className="relative w-full col-span-1 h-full">
            <ImageItem image={images[1]} />
          </div>
        </div>
      );
    }
    if (images.length >= 3) {
      return (
        <div
          onClick={onClick}
          className={`${heightClass} grid grid-cols-3 gap-2 rounded-lg overflow-hidden cursor-zoom-in`}
        >
          <div className="relative w-full h-full col-span-2 min-w-0 min-h-0">
            <ImageItem image={images[0]} />
          </div>

          <div className="col-span-1 h-full flex flex-col gap-2 min-w-0 min-h-0">
            <div className="w-full h-full relative">
              <ImageItem image={images[1]} />
            </div>
            <div className="relative w-full h-full">
              <ImageItem image={images[2]} />
            </div>
          </div>
        </div>
      );
    }
  }
};

const ImageItem = ({ image }: { image: MediaItem }) => {
  return (
    <>
      <div className="absolute bg-black opacity-0 h-full w-full z-10 hover:opacity-30 transition-opacity duration-200"></div>
      <img
        className="w-full h-full object-cover"
        src={image.url}
        alt={image.alt}
      />
    </>
  );
};
