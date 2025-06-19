// debounce.js
let saveTimeout;
export function debouncedSave(saveFn, delay = 300) {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveFn, delay);
}

