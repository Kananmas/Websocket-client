import { useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContext";

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
