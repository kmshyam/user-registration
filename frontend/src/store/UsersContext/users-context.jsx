import { createContext } from "react";

const UsersContext = createContext({
  registeredUsers: [],
  addUserRegistrationDetailsHandler: () => {},
  updateUserRegistrationDetailsHandler: () => {},
  deleteUserDataHandler: () => {},
});

export default UsersContext;
