import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
