/**
 * Checks the length of a given text and truncates it if it exceeds a specified cutoff length.
 * Adds an ellipsis ("...") to indicate truncation.
 *
 * @param text - The text to be checked and possibly truncated.
 * @param cutoff - The maximum allowed length of the text before truncation.
 * @returns The original text if its length is less than or equal to the cutoff, otherwise a truncated version with an ellipsis.
 */

export const checkLongText = (text: string, cutoff: number) => {
  if (text) {
    if (text.length > cutoff) {
      const cutText = text.slice(0, cutoff);
      return cutText + "...";
    }
    return text;
  }
};
