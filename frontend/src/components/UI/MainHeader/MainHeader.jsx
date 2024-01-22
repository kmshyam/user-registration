import React from "react";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={`${classes.header} ${props.className}`}>
      <h2>{props.heading}</h2>
    </header>
  );
};

export default MainHeader;
