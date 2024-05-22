import { useState } from "react";

import { MediaItem } from "../interfaces";
import BackButton from "./BackButton";
import { useCheckMultipleMedia } from "../hooks/useCheckMultipleMedia";

const MobileSlideShow = ({ images }: { images: MediaItem[] | undefined }) => {
  const checkedMedia = useCheckMultipleMedia(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const newSlideIndex = Math.round(target.scrollLeft / window.innerWidth);

    if (newSlideIndex !== currentIndex) {
      setCurrentIndex(newSlideIndex);
    }
  }

  if (images) {
    return (
      <div className="relative">
        <BackButton overrideClasses="absolute z-[1010] bg-white top-4 left-4" />
        <div
          onScroll={(e) => handleScroll(e)}
          className="no-scrollbar flex w-full overflow-hidden snap-x snap-mandatory overflow-x-scroll"
        >
          {checkedMedia.map((image, index) => {
            return (
              <div
                className="w-full h-[400px] md:h-[600px] snap-start grow-0 shrink-0 basis-full"
                key={index}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image.url}
                  alt={image.alt}
                />
              </div>
            );
          })}
        </div>
        <div className="absolute z-10 bottom-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded ">
          {currentIndex + 1 + "/" + images.length}
        </div>
      </div>
    );
  }
};

export default MobileSlideShow;
