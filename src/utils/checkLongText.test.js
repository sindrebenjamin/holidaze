const checkLongText = (text, cutoff) => {
  if (text) {
    if (text.length > cutoff) {
      const cutText = text.slice(0, cutoff);
      return cutText + "...";
    }
    return text;
  }
};
