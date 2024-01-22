import React, { useState } from "react";
import classes from "./AdminMainNavigation.module.css";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideNavbar from "./SideNavbar/SideNavbar";
import Footer from "./Footer/Footer";

const AdminMainNavigation = () => {
  const [showNav, setShowNav] = useState(0);
  const toggle = () => {
    setShowNav(Number(!showNav));
  };
  return (
    <div className={classes["main-container"]}>
      <SideNavbar visible={showNav} close={toggle} />
      <header className={classes["header-container"]}>
        <Header toggle={toggle} visible={showNav} />
      </header>
      {showNav === 1 ? (
        <main className={classes["main-content-container"]}>
          <section className={classes["main-content"]}>
            <Outlet />
          </section>
          <footer>
            <Footer />
          </footer>
        </main>
      ) : (
        <main className={classes["main-content-container"]}>
          <section className={classes["main-content"]}>
            <Outlet />
          </section>
          <footer>
            <Footer />
          </footer>
        </main>
      )}
    </div>
  );
};

export default AdminMainNavigation;
