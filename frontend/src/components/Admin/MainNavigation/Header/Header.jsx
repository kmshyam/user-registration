import React from "react";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../../store/AuthContext/AuthContextProvider";
import { getTokenDetails } from "../../../Utils/auth";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

const Header = ({ toggle, visible }) => {
  // const { userProfileData } = useAuth();
  const { username } = getTokenDetails();
  // const { name, profile_pic } = userProfileData;
  return (
    <div className={classes["header-container"]}>
      <div className={classes["menu-icon-box"]} onClick={toggle}>
        {!visible && (
          <FontAwesomeIcon icon={faBars} className={classes["menu-icon"]} />
        )}
      </div>
      <div className={classes["user-icon-box"]}>
        {/* {profile_pic ? (
          <img
            src={`${url}:${port}/public/users/${us_name}/profile/${profile_pic}`}
            alt="Profile pic"
          />
        ) : ( */}
        <h6 className={classes["user-initial"]}>
          {username?.toUpperCase().slice(0, 1)}
        </h6>
        {/* )} */}
      </div>
    </div>
  );
};

export default Header;
