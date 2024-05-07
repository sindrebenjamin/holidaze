import { useState } from "react";

import { MediaItem } from "../../interfaces";
import SlideShowButton from "./SlideshowButton";
import Close from "../icons/Close";

const SlideShowModal = ({
  images,
  onClick,
}: {
  images: MediaItem[] | undefined;
  onClick: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black absolute top-0 left-0 z-[1001] gap-2">
        <button
          onClick={onClick}
          className="hover:opacity-50 transition-opacity duration-100 absolute top-8 right-8 flex text-white items-center"
        >
          <Close color="white" /> Close
        </button>
        {images.length > 1 && (
          <SlideShowButton
            direction="left"
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + images.length) % images.length
              )
            }
          />
        )}

        <img
          className="w-[75%] h-[70%] max-w-[1500px] object-cover"
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
        />
        {images.length > 1 && (
          <SlideShowButton
            onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          />
        )}

        <div className="absolute bottom-8 text-white">
          {currentIndex + 1 + "/" + images.length}
        </div>
      </div>
    );
  }
};

export default SlideShowModal;
