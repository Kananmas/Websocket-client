export function useLocalStorage() {
  const getter = (key) => {
    const item = localStorage.getItem(key);

    return JSON.parse(item);
  };

  const setter = (key, value) => {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  };

  return [getter, setter];
}
