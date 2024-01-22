import React, { useReducer } from "react";
import classes from "./Documents.module.css";
import { Input, SelectInput } from "../../../../UI/Input/InputItem";
import Button from "../../../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUsers } from "../../../../../store/UsersContext/UserContextProvider";

const initialState = {
  education_details: [],
  documents: [],
  qualification: { data: "10th", value: "10th" },
  institution: "",
  passedYear: "",
  cgpa: "",
};

const documentsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_EDUCATION_QUALIFICATION":
      return {
        ...state,
        education_details: [
          ...state.education_details,
          {
            qualification: state.qualification,
            institution: state.institution,
            passedYear: state.passedYear,
            cgpa: state.cgpa,
          },
        ],
        qualification: { data: "10th", value: "10th" },
        institution: "",
        passedYear: "",
        cgpa: "",
      };
    case "DELETE_EDUCATION_QUALIFICATION":
      return {
        ...state,
        education_details: state.education_details.filter(
          (_, index) => index !== action.payload.index
        ),
      };
    default:
      return state;
  }
};

const Documents = () => {
  const [documentsState, dispatchFn] = useReducer(
    documentsReducer,
    initialState
  );
  const { addUserRegistrationDetailsHandler } = useUsers();
  const navigate = useNavigate();

  const qualificationChangeHandler = (qualification) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: qualification, name: "qualification" },
    });
  };

  const institutionChangeHandler = (institution) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: institution, name: "institution" },
    });
  };

  const passedYearChangeHandler = (passedYear) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: passedYear, name: "passedYear" },
    });
  };

  const cgpaChangeHandler = (cgpa) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: cgpa, name: "cgpa" },
    });
  };

  const addEducationQualificationHandler = () => {
    dispatchFn({
      type: "ADD_EDUCATION_QUALIFICATION",
    });
  };

  const deleteEducationDetailHandler = (index) => {
    dispatchFn({
      type: "DELETE_EDUCATION_QUALIFICATION",
      payload: { index },
    });
  };

  const previousNavigateHandler = () => {
    sessionStorage.removeItem("userDocumentsData");
    const userLocationData = JSON.parse(
      sessionStorage.getItem("userLocationData")
    );
    navigate("/user/registration/location_info", {
      state: userLocationData,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { personalInfoState } = JSON.parse(
      sessionStorage.getItem("userPersonalData")
    );
    const { boardingInfoState } = JSON.parse(
      sessionStorage.getItem("userBoardingData")
    );
    const { locationInfoState } = JSON.parse(
      sessionStorage.getItem("userLocationData")
    );
    const documentsData = documentsState;

    await addUserRegistrationDetailsHandler(
      personalInfoState,
      boardingInfoState,
      locationInfoState,
      documentsData
    );
    sessionStorage.removeItem("userPersonalData");
    sessionStorage.removeItem("userBoardingData");
    sessionStorage.removeItem("userLocationData");
    navigate("/user/registration/personal_info");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["documents-box"]}>
        <h2>Documents</h2>
      </div>
      <div className={classes["education-details-box"]}>
        <h2>Education Qualification</h2>
        <div className={classes["education-input-box"]}>
          <SelectInput
            name="qualification"
            label="Qualification"
            options={["10th", "12th", "Graduate", "Post Graduate"]}
            onChange={qualificationChangeHandler}
            value={documentsState.qualification.data}
            required={false}
          />
          <Input
            type="text"
            label="Institution"
            name="institution"
            placeholder="Institution"
            onChange={institutionChangeHandler}
            value={documentsState.institution}
            required={false}
          />
          <Input
            type="text"
            label="Passed Year"
            name="passed_year"
            placeholder="Passed Year"
            onChange={passedYearChangeHandler}
            value={documentsState.passedYear}
            required={false}
          />
          <div className={classes["cgpa-input"]}>
            <Input
              type="text"
              label="CGPA"
              name="cgpa"
              placeholder="CGPA"
              onChange={cgpaChangeHandler}
              value={documentsState.cgpa}
              required={false}
            />
            <div
              className={classes["add-education-btn"]}
              onClick={addEducationQualificationHandler}
            >
              +
            </div>
          </div>
        </div>
        <div className={classes["education-details-container"]}>
          <ul className={classes["education-details-list-headings"]}>
            <li>S No</li>
            <li>Qualification</li>
            <li>Institution</li>
            <li>Passed Year</li>
            <li>% or CGPA</li>
            <li>Action</li>
          </ul>
          {documentsState.education_details.map((item, index) => (
            <ul className={classes["education-details-lists"]} key={index}>
              <li>{index + 1}</li>
              <li>{item.qualification.data}</li>
              <li>{item.institution}</li>
              <li>{item.passedYear}</li>
              <li>{item.cgpa}</li>
              <li>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteEducationDetailHandler(index)}
                  className={classes["delete-icon"]}
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div
        className={`${classes["form-actions"]} ${classes["previous-submit-btns"]}`}
      >
        <Button
          className={`${classes.btn} ${classes["previous-btn"]}`}
          onClick={previousNavigateHandler}
        >
          Previous
        </Button>
        <Button
          type="submit"
          className={`${classes.btn} ${classes["submit-btn"]}`}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Documents;
