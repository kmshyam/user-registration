import { createContext } from "react";

const AuthContext = createContext({
  loginHandler: () => {},
});

export default AuthContext;
