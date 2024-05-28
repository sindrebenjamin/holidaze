/**
 * Checks if a given URL points to a valid media resource (image).
 * Resolves with the URL if the media is valid, or with a fallback URL if the media is not found or the URL is undefined.
 *
 * @param url - The URL of the media resource to be checked.
 * @returns A promise that resolves to the original URL if the media is valid, or to a fallback URL ("/nomedia.jpg") if the media is invalid or the URL is undefined.
 */

export const checkMedia = (url: string | undefined): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      if (url) {
        resolve(url);
      }
    };

    img.onerror = function () {
      resolve("/nomedia.jpg");
    };

    if (url) {
      img.src = url;
    } else {
      resolve("/nomedia.jpg");
    }
  });
};
