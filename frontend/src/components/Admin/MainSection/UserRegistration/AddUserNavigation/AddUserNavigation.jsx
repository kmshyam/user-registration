import React from "react";
import classes from "./AddUserNavigation.module.css";
import { useLocation } from "react-router-dom";

const addUserMenuItems = [
  {
    id: 1,
    name: "Personal Information",
    path: `/user/registration/personal_info`,
  },
  {
    id: 2,
    name: "Boarding Information",
    path: `/user/registration/boarding_info`,
  },
  {
    id: 3,
    name: "Location Information",
    path: `/user/registration/location_info`,
  },
  {
    id: 4,
    name: "Documents",
    path: `/user/registration/documents`,
  },
];

const AddUserNavigation = () => {
  const location = useLocation();
  return (
    <ul className={classes["add-user-menu-items"]}>
      {addUserMenuItems.map((item) => (
        <li
          className={`${classes["menu-item"]} ${
            location.pathname === item.path ? classes["active"] : ""
          }`}
          key={item.id}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default AddUserNavigation;
