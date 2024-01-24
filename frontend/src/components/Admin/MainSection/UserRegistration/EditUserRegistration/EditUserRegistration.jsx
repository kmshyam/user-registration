import React from "react";
import classes from "./EditUserRegistration.module.css";
import MainHeader from "../../../../UI/MainHeader/MainHeader";
import EditUserNavigation from "./EditUserNavigation/EditUserNavigation";
import { Outlet } from "react-router-dom";

const EditUserRegistration = () => {
  return (
    <div>
      <MainHeader
        heading="Edit User Registration Form"
        className={classes.header}
      />
      <EditUserNavigation />
      <section className={classes["edit-user-section"]}>
        <Outlet />
      </section>
    </div>
  );
};

export default EditUserRegistration;
