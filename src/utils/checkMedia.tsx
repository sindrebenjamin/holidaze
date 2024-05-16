export const checkMedia = (url: string | undefined): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      if (url) {
        resolve(url);
      }
    };

    img.onerror = function () {
      resolve("/public/nomedia.jpg");
    };

    if (url) {
      img.src = url;
    } else {
      resolve("/public/nomedia.jpg");
    }
  });
};
