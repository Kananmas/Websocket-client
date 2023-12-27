import { getFromLocalStorage } from "./get-from-localstorage";

export function getAccessToken() {
  const tokenHolder = getFromLocalStorage("access_Token");

  if (!tokenHolder) return null;

  const token = tokenHolder["accessToken"];
  return token;
}
