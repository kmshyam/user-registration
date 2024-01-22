import React from "react";
import classes from "./Footer.module.css";
import footerLogo from "../../../assets/Logos/mainLogo.jpg";

const Footer = () => {
  return (
    <div className={classes["footer-container"]}>
      <div className={classes.copyright}>
        <div className={classes.logo}>
          <img src={footerLogo} alt="Footer logo" />
        </div>
        <p> &#169;{new Date().getFullYear()} Hilife, All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
