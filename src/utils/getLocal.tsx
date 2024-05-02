export function getLocal(key: string) {
  const item = localStorage.getItem(key);
  if (typeof item === "string") {
    return JSON.parse(item);
  } else {
    return item;
  }
}
