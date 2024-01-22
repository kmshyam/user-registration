import React, { useState } from "react";
import classes from "./SideNavbar.module.css";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItems";
import NavItemsGroup from "./NavItemsGroup";
import hilifeLogo from "../../../assets/Logos/mainLogo.jpg";

const SideNavbar = (props) => {
  const navigate = useNavigate();
  const [compact, setCompact] = useState(true);

  const showNavbarToggleHandler = () => {
    setCompact(false);
  };

  const hideNavbarToggleHandler = () => {
    setCompact(true);
  };

  const homeNavigateHandler = () => {
    navigate("../admin");
  };

  const logoutHandler = () => {
    localStorage.removeItem("TOKEN");
    navigate("../signin");
  };

  return (
    <>
      <div
        className={`${props.visible ? classes.backdrop : ""}`}
        onClick={props.close}
      />
      <div
        className={`${
          props.visible
            ? ""
            : `${classes["sidenav-container"]} ${
                compact ? classes.compact : ""
              }`
        } ${
          props.visible
            ? classes["transition-show"]
            : classes["transition-hide"]
        }`}
      >
        <nav
          className={`${classes.navbar} ${compact ? classes.compact : ""}`}
          onMouseOver={showNavbarToggleHandler}
          onMouseLeave={hideNavbarToggleHandler}
        >
          <div className={classes.logo} onClick={homeNavigateHandler}>
            {compact ? (
              <div className={classes["main-logo-container"]}>
                <img src={hilifeLogo} alt="Hilife logo" />
              </div>
            ) : (
              <div className={classes["main-logo-box"]}>
                <div className={classes["main-logo-container"]}>
                  <img src={hilifeLogo} alt="Hilife logo" />
                </div>
                <div
                  className={
                    compact ? classes["compact-logo"] : classes["normal-logo"]
                  }
                >
                  Hilife AI
                </div>
              </div>
            )}
          </div>
          <NavItemsGroup compact={compact} />
          <NavItem
            compact={compact}
            iconClassName={faPowerOff}
            label="Logout"
            onClick={logoutHandler}
            to="auth/signin"
          />
        </nav>
      </div>
    </>
  );
};

export default SideNavbar;
