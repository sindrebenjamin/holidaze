import { useEffect, useState } from "react";

import { checkMedia } from "../utils/checkMedia";

export function useCheckMedia(originalUrl: string | undefined) {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    checkMedia(originalUrl).then((url) => {
      if (isMounted) {
        setImageSrc(url as string);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [originalUrl]);

  return imageSrc;
}
