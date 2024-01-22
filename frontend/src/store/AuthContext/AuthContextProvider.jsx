import React, { useContext, useState } from "react";
import AuthContext from "./auth-context";
import { storeAuthToken } from "../../components/Utils/auth";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

const AuthContextProvider = ({ children }) => {
  const [status, setStatus] = useState({});

  const loginHandler = async (loginData) => {
    const response = await fetch(`${url}:${port}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    setStatus(data);
    if (data.status === "Success") {
      await storeAuthToken(data.token);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return authCtx;
};

export default AuthContextProvider;
