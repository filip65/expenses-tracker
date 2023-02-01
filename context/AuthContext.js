import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
