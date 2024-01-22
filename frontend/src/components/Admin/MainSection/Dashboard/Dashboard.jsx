import React from "react";
import classes from "./Dashboard.module.css";
import { getTokenDetails } from "../../../Utils/auth";

const Dashboard = () => {
  const tokenDetails = getTokenDetails();
  return (
    <div className={classes["dashboard-section"]}>
      <h1>{`Welcome ${
        tokenDetails.username.split("-")[0].slice(0, 1).toUpperCase() +
        tokenDetails.username.split("-")[0].slice(1)
      }`}</h1>
      <h3>This is a Dashboard Page</h3>
      <p>{`Your User ID: ${tokenDetails.userID}`}</p>
    </div>
  );
};

export default Dashboard;
