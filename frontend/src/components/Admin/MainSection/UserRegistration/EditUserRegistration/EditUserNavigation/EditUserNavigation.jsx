import React from "react";
import classes from "./EditUserNavigation.module.css";
import { useLocation } from "react-router-dom";

const editUserMenuItems = [
  {
    id: 1,
    name: "Personal Information",
    path: `/user/registration/edit/personal_info`,
  },
  {
    id: 2,
    name: "Boarding Information",
    path: `/user/registration/edit/boarding_info`,
  },
  {
    id: 3,
    name: "Location Information",
    path: `/user/registration/edit/location_info`,
  },
  {
    id: 4,
    name: "Documents",
    path: `/user/registration/edit/documents`,
  },
];

const EditUserNavigation = () => {
  const location = useLocation();
  return (
    <ul className={classes["add-user-menu-items"]}>
      {editUserMenuItems.map((item) => (
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

export default EditUserNavigation;
