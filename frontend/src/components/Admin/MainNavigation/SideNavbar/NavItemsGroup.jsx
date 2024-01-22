import React from "react";
import classes from "./NavItemsGroup.module.css";
import NavItem from "./NavItems";
import {
  faHome,
  faFile,
  faPersonChalkboard,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    to: "dashboard",
    icon: faHome,
    label: "Dashboard",
    name: "dashboard",
  },
  {
    to: "user/registration/personal_info",
    icon: faFile,
    label: "User Registration",
    name: "user_registration",
  },
  {
    to: "user/all",
    icon: faPersonChalkboard,
    label: "Registered Users",
    name: "registered_users",
  },
];
const NavItemsGroup = ({ compact }) => {
  return (
    <div
      className={
        !compact
          ? classes["navlink-group"]
          : `${classes["navlink-group"]} ${classes["compact-navlink-group"]}`
      }
    >
      {menuItems.map((menuItem) => (
        <NavItem
          key={Math.random().toString()}
          to={menuItem.to}
          iconClassName={menuItem.icon}
          label={menuItem.label}
          compact={compact}
        />
      ))}
    </div>
  );
};

export default NavItemsGroup;
