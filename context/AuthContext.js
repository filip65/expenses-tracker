import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [localId, setLocalId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = ({ token, localId }) => {
    setToken(token);
    setLocalId(localId);
    setIsAuthenticated(true);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("localId", localId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setLocalId("");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("localId");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        localId,
        isAuthenticated,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
