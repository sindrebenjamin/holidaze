import { useState, useEffect, useRef } from "react";

import VenueMediaInput from "../../VenueMediaInput";
import DragAndDropArea from "../../DragAndDropArea";
import DraggableImage from "../../DraggableImage";

interface MediaModuleProps {
  currentMediaString: string;
  handleMediaStringOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMediaError: boolean;
  mediaArray: Array<{ id: number; url: string }>;
  handleMoveImage: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveImage: (id: number) => void;
}

const MediaModule = ({
  currentMediaString,
  handleMediaStringOnChange,
  isMediaError,
  mediaArray,
  handleMoveImage,
  handleRemoveImage,
}: MediaModuleProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mediaArray.length === 8) {
      setIsFocused(false);
    }
  }, [mediaArray.length]);
  const boxClasses = isFocused ? "border-gray-800" : "border-gray-400";

  return (
    <>
      <h2 className="text-gray-500 text-lg">
        Add up to 8 photos and order them ({mediaArray.length}/8)
      </h2>
      <VenueMediaInput
        ref={inputRef}
        name="media"
        placeholder="https://images.com/image.jpg"
        label="Add photo URL"
        value={currentMediaString}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleMediaStringOnChange(e)
        }
        error={isMediaError}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={mediaArray.length === 8}
      />
      <DragAndDropArea>
        {mediaArray.map((image, index) => {
          return (
            <DraggableImage
              key={image.id}
              id={image.id}
              url={image.url}
              index={index}
              moveImage={handleMoveImage}
              onClick={() => handleRemoveImage(image.id)}
            />
          );
        })}
        {mediaArray.length < 1 && (
          <>
            <div
              onClick={() => inputRef.current?.focus()}
              className={`border ${boxClasses} aspect-square rounded-lg border-dotted`}
            ></div>
            <div className="border border-gray-300 aspect-square rounded-lg border-dotted"></div>
          </>
        )}
        {isFocused && mediaArray.length > 0 && (
          <div className="border border-gray-800 aspect-square rounded-lg border-dotted"></div>
        )}
      </DragAndDropArea>
    </>
  );
};

export default MediaModule;