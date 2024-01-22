import React, { useRef } from "react";
import classes from "./SigninForm.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext/AuthContextProvider";

const SigninForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { loginHandler } = useAuth();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    const data = await loginHandler(loginData);
    if (data.status === "Success") {
      navigate("/dashboard");
    }
  };

  return (
    <section className={classes["login-section"]}>
      <div className={classes["login-container"]}>
        <div className={classes.drop}>
          <div className={classes["login-box"]}>
            <h2>Sign in</h2>
            <form className={classes["login-form"]} onSubmit={submitHandler}>
              <div className={classes["form-controls"]}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  ref={emailInputRef}
                />
              </div>
              <div className={classes["form-controls"]}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </div>
              <div className={classes["form-controls"]}>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
