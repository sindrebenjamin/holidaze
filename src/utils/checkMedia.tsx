export const checkMedia = (url: string) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = function () {
      resolve(url);
    };

    img.onerror = function () {
      resolve("/public/nomedia.jpg");
    };

    img.src = url;
  });
};
