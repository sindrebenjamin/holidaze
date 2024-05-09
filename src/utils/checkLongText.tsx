export const checkLongText = (text: string, cutoff: number) => {
  if (text) {
    if (text.length > cutoff) {
      const cutText = text.slice(0, cutoff);
      return cutText + "...";
    }
    return text;
  }
};
