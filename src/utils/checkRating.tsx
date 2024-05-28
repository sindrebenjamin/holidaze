/**
 * Checks the given number and formats it based on whether it is an integer or a floating-point number.
 * If the number is an integer, it is returned as is. If it is a floating-point number, it is formatted to two decimal places.
 *
 * @param num - The number to be checked and formatted.
 * @returns The original number if it is an integer, or the number formatted to two decimal places if it is a floating-point number.
 */

export function checkRating(num: number) {
  if (Number.isInteger(num)) {
    return num;
  } else {
    return num.toFixed(2);
  }
}
