export function setLocal(key: string, value: string | object) {
  localStorage.setItem(key, JSON.stringify(value));
}
