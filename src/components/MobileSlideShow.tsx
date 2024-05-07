import { useState } from "react";

import { MediaItem } from "../interfaces";

const MobileSlideShow = ({ images }: { images: MediaItem[] | undefined }) => {
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
        <div
          onScroll={(e) => handleScroll(e)}
          className="no-scrollbar flex w-full overflow-hidden snap-x snap-mandatory overflow-x-scroll"
        >
          {images.map((image) => {
            return (
              <div
                className="w-full h-[400px] snap-start grow-0 shrink-0 basis-full"
                key={image.url}
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
