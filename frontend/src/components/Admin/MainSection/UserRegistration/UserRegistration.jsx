import React from "react";
import classes from "./UserRegistration.module.css";
import MainHeader from "../../../UI/MainHeader/MainHeader";
import AddUserNavigation from "./AddUserNavigation/AddUserNavigation";
import { Outlet } from "react-router-dom";

const UserRegistration = () => {
  return (
    <div>
      <MainHeader heading="User Registration Form" className={classes.header} />
      <AddUserNavigation />
      <section className={classes["add-user-section"]}>
        <Outlet />
      </section>
    </div>
  );
};

export default UserRegistration;
