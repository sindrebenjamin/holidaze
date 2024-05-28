/**
 * Checks if the current device is a touch device.
 *
 * @returns True if the device supports touch events, otherwise false.
 */

export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
