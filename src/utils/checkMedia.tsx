export const checkMedia = (url: string): Promise<string> => {
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
