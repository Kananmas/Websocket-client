// get form local storage is used for Class components or other utilites or js files
export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
