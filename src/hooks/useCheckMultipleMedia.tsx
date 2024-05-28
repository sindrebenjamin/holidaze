import { useEffect, useState } from "react";

import { checkMedia } from "../utils/checkMedia";
import { MediaItem } from "../interfaces";

/**
 * Check and update multiple media source URLs.
 *
 * @function useCheckMultipleMedia
 * @param images - An array of media items to check.
 * @returns An array of processed media items with updated URLs.
 */

export function useCheckMultipleMedia(images: MediaItem[] | undefined) {
  const [processedImages, setProcessedImages] = useState<MediaItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    const processImages = async () => {
      if (images) {
        const checkedImages = await Promise.all(
          images.map(async (image) => {
            return {
              url: await checkMedia(image.url),
              alt: image.alt,
            };
          })
        );

        if (isMounted) {
          setProcessedImages(checkedImages);
        }
      }
    };
    processImages();
    return () => {
      isMounted = false;
    };
  }, [images]);

  return processedImages;
}
