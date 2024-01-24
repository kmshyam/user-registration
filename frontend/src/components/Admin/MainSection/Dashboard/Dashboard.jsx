import React from "react";
import classes from "./Dashboard.module.css";
import { getTokenDetails } from "../../../Utils/auth";
import dashboardImg from "../../../assets/Dashboard/dashboard.jpg";

const Dashboard = () => {
  const tokenDetails = getTokenDetails();
  return (
    <div className={classes["dashboard-section"]}>
      <h1>{`Welcome ${
        tokenDetails.username.split("-")[0].slice(0, 1).toUpperCase() +
        tokenDetails.username.split("-")[0].slice(1)
      }`}</h1>
      <div className={classes["dashboard-img-box"]}>
        <img src={dashboardImg} alt="Dashboard" />
      </div>
      <p>{`Your User ID: ${tokenDetails.userID}`}</p>
    </div>
  );
};

export default Dashboard;
