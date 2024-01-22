import React, { useEffect, useReducer } from "react";
import classes from "./BoardingInformation.module.css";
import { Input, SelectInput } from "../../../../UI/Input/InputItem";
import Button from "../../../../UI/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { randomTenDigNum } from "../../../../Utils/unique";

const initialState = {
  company: { data: "", value: "" },
  branch: { data: "", value: "" },
  unit: { data: "", value: "" },
  floor: { data: "", value: "" },
  department: { data: "", value: "" },
  team: { data: "", value: "" },
  designation: { data: "", value: "" },
  shift_timing: { data: "", value: "" },
  week_off: { data: "", value: "" },
  reporting_to: { data: "", value: "" },
  employee_code: "",
  work_station: { data: "", value: "" },
  username: "",
  password: "",
  company_name: "",
};

const boardingInfoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.name]: action.payload.value };
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload.username,
        employee_code: action.payload.emp_code,
      };
    case "UPDATE_STORED_DATA":
      return {
        ...state,
        company: action.payload.company,
        branch: action.payload.branch,
        unit: action.payload.unit,
        floor: action.payload.floor,
        department: action.payload.department,
        team: action.payload.team,
        designation: action.payload.designation,
        shift_timing: action.payload.shift_timing,
        week_off: action.payload.week_off,
        reporting_to: action.payload.reporting_to,
        employee_code: action.payload.employee_code,
        work_station: action.payload.work_station,
        username: action.payload.username,
        password: action.payload.password,
        company_name: action.payload.company_name,
      };
    default:
      return state;
  }
};

const BoardingInformation = () => {
  const [boardingInfoState, dispatchFn] = useReducer(
    boardingInfoReducer,
    initialState
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { personalInfoState } = JSON.parse(
      sessionStorage.getItem("userPersonalData")
    );
    dispatchFn({
      type: "UPDATE_USERNAME",
      payload: {
        username: `${personalInfoState.email?.split("@")[0]}-${
          personalInfoState.user_id?.split("HL")[0]
        }${personalInfoState.user_id?.split("HL")[1]}`,
        emp_code: `${new Date().getFullYear()}${
          personalInfoState.user_id?.split("HL")[0]
        }${personalInfoState.user_id?.split("HL")[1]}`,
      },
    });
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      dispatchFn({ type: "UPDATE_STORED_DATA", payload: location.state });
    }
  }, []);

  const companyChangeHandler = (company) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: company, name: "company" },
    });
  };

  const branchChangeHandler = (branch) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: branch, name: "branch" },
    });
  };

  const unitChangeHandler = (unit) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: unit, name: "unit" },
    });
  };

  const floorChangeHandler = (floor) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: floor, name: "floor" },
    });
  };

  const departmentChangeHandler = (department) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: department, name: "department" },
    });
  };

  const teamChangeHandler = (team) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: team, name: "team" },
    });
  };

  const designationChangeHandler = (designation) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: designation, name: "designation" },
    });
  };

  const shiftTimingChangeHandler = (shiftTiming) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: shiftTiming, name: "shift_timing" },
    });
  };

  const weekOffChangeHandler = (weekOff) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: weekOff, name: "week_off" },
    });
  };

  const reportingToChangeHandler = (reportingTo) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: reportingTo, name: "reporting_to" },
    });
  };

  const workStationChangeHandler = (workStation) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: workStation, name: "work_station" },
    });
  };

  const passwordChangeHandler = (password) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: password, name: "password" },
    });
  };

  const companyNameChangeHandler = (companyName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: companyName, name: "company_name" },
    });
  };

  const previousNavigateHandler = () => {
    sessionStorage.removeItem("userBoardingData");
    const userPersonalData = JSON.parse(
      sessionStorage.getItem("userPersonalData")
    );
    navigate("/user/registration/personal_info", {
      state: userPersonalData.personalInfoState,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userBoardingData");
    sessionStorage.setItem(
      "userBoardingData",
      JSON.stringify({ boardingInfoState })
    );
    navigate("/user/registration/location_info");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["boarding-information-box"]}>
        <h2>Boarding Details</h2>
        <div className={classes["boarding-details-box"]}>
          <SelectInput
            name="company"
            label="Company"
            options={["Hilife"]}
            onChange={companyChangeHandler}
            value={boardingInfoState.company.data}
            required={true}
          />
          <SelectInput
            name="branch"
            label="Branch"
            options={["Thiruchirapalli"]}
            onChange={branchChangeHandler}
            value={boardingInfoState.branch.data}
            required={true}
          />
          <SelectInput
            name="unit"
            label="Unit"
            options={["Software"]}
            onChange={unitChangeHandler}
            value={boardingInfoState.unit.data}
            required={false}
          />
          <SelectInput
            name="floor"
            label="Floor"
            options={["3rd Floor"]}
            onChange={floorChangeHandler}
            value={boardingInfoState.floor.data}
            required={false}
          />
          <SelectInput
            name="department"
            label="Department"
            options={["Training", "Production", "Operation", "Management"]}
            onChange={departmentChangeHandler}
            value={boardingInfoState.department.data}
            required={false}
          />
          <SelectInput
            name="team"
            label="Team"
            options={["HR", "Intern", "Training", "Testing", "Development"]}
            onChange={teamChangeHandler}
            value={boardingInfoState.team.data}
            required={true}
          />
          <SelectInput
            name="designation"
            label="Designation"
            options={["Tester", "Developer", "HR"]}
            onChange={designationChangeHandler}
            value={boardingInfoState.designation.data}
            required={false}
          />
          <SelectInput
            name="shift_timing"
            label="Shift Timing"
            options={["Shift 1", "Shift 2", "Shift 3"]}
            onChange={shiftTimingChangeHandler}
            value={boardingInfoState.shift_timing.data}
            required={true}
          />
          <SelectInput
            name="week_off"
            label="Week Off"
            options={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            onChange={weekOffChangeHandler}
            value={boardingInfoState.week_off.data}
            required={false}
          />
          <SelectInput
            name="reporting_to"
            label="Reporting To"
            options={["Rajesh", "Mohan", "Santhosh", "Rakesh"]}
            onChange={reportingToChangeHandler}
            value={boardingInfoState.reporting_to.data}
            required={false}
          />
          <Input
            type="text"
            label="Employee Code"
            name="employee_code"
            value={boardingInfoState.employee_code}
            readOnly={true}
            disabled={true}
            required={true}
          />
          <SelectInput
            name="work_station"
            label="Work Station"
            options={["Thiruchirapalli"]}
            onChange={workStationChangeHandler}
            value={boardingInfoState.work_station.data}
            required={true}
          />
        </div>
      </div>
      <div className={classes["login-box"]}>
        <h2>Login Details</h2>
        <div className={classes["login-input-box"]}>
          <Input
            type="text"
            label="Username"
            name="username"
            placeholder="Username"
            value={boardingInfoState.username}
            required={true}
            disabled={true}
          />
          <Input
            type="text"
            label="Password"
            name="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
            value={boardingInfoState.password}
            required={true}
          />
          <Input
            type="text"
            label="Company Name"
            name="company_name"
            placeholder="Company Name"
            onChange={companyNameChangeHandler}
            value={boardingInfoState.company_name}
            required={true}
          />
        </div>
      </div>
      <div
        className={`${classes["form-actions"]} ${classes["previous-next-btns"]}`}
      >
        <Button
          className={`${classes.btn} ${classes["previous-btn"]}`}
          onClick={previousNavigateHandler}
        >
          Previous
        </Button>
        <Button
          type="submit"
          className={`${classes.btn} ${classes["next-btn"]}`}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default BoardingInformation;
