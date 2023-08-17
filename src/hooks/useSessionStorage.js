export function useSessionStorage() {
  const getter = (key) => {
    const item = sessionStorage.getItem(key);

    return JSON.parse(item);
  };

  const setter = (key, value) => {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }

    sessionStorage.setItem(key, value);
  };

  return [getter, setter];
}
