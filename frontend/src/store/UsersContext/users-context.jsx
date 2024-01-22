import { createContext } from "react";

const UsersContext = createContext({
  registeredUsers: [],
  addUserRegistrationDetailsHandler: () => {},
  deleteUserDataHandler: () => {},
});

export default UsersContext;
