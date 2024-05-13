export function checkRating(num: number) {
  if (Number.isInteger(num)) {
    return num;
  } else {
    return num.toFixed(2);
  }
}
