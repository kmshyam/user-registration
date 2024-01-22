import React from "react";
import classes from "./NavItems.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = ({
  children,
  iconClassName,
  label,
  to,
  compact,
  onClick,
  name,
}) => {
  return (
    <div className={classes["menu-item"]}>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? classes.active : "")}
        onClick={onClick}
      >
        {children || (
          <>
            <div className={classes["menu-icons"]}>
              <FontAwesomeIcon icon={iconClassName} className={classes.icon} />
            </div>
            <p className={compact ? classes["compact-menu-items"] : ""}>
              {label}
            </p>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default NavItem;
