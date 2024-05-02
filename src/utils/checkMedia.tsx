export const checkMedia = (url: string) => {
  return new Promise((resolve) => {
    let img = new Image();

    img.onload = function () {
      resolve(url);
    };

    img.onerror = function () {
      resolve("/public/nomedia.jpg");
    };

    img.src = url;
  });
};
