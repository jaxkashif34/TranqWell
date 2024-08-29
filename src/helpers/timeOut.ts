export function timeout(callback: () => void, milliseconds = 2000) {
  return setTimeout(callback, milliseconds);
}
