import React, { useEffect, useReducer } from "react";
import classes from "./PersonalInformation.module.css";
import { Input, SelectInput } from "../../../../UI/Input/InputItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateBackward,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../UI/Button/Button";
import { getAuthToken } from "../../../../Utils/auth";
import { randomTwoDigNum, randomFiveDigNum } from "../../../../Utils/unique";
import { useLocation, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

const initialState = {
  user_id: "",
  first_name: "",
  last_name: "",
  legal_name: "",
  father_name: "",
  mother_name: "",
  date_of_birth: "",
  gender: { data: "", value: "" },
  marital_status: { data: "", value: "" },
  blood_group: { data: "", value: "" },
  email: "",
  location: "",
  contact_personal: "",
  contact_family: "",
  emergency_number: "",
  dot: "",
  doj: "",
  aadhar_number: "",
  pan_number: "",
  storedFileName: "",
  originalFileName: "",
};

const personalInfoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.name]: action.payload.value };
    case "UPDATE_USERID":
      return {
        ...state,
        user_id: `${randomTwoDigNum()}HL${randomFiveDigNum()}`,
      };
    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        storedFileName: action.payload.stored_filename,
        originalFileName: action.payload.original_filename,
      };
    case "UPDATE_STORED_DATA":
      return {
        ...state,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        legal_name: action.payload.legal_name,
        father_name: action.payload.father_name,
        mother_name: action.payload.mother_name,
        date_of_birth: action.payload.date_of_birth,
        gender: {
          data: action.payload.gender.data,
          value: action.payload.gender.data,
        },
        marital_status: {
          data: action.payload.marital_status.data,
          value: action.payload.marital_status.data,
        },
        blood_group: {
          data: action.payload.blood_group.data,
          value: action.payload.blood_group.data,
        },
        email: action.payload.email,
        location: action.payload.location,
        contact_personal: action.payload.contact_personal,
        contact_family: action.payload.contact_family,
        emergency_number: action.payload.emergency_number,
        dot: action.payload.dot,
        doj: action.payload.doj,
        aadhar_number: action.payload.aadhar_number,
        pan_number: action.payload.pan_number,
        storedFileName: action.payload.storedFileName,
        originalFileName: action.payload.originalFileName,
      };
    default:
      return state;
  }
};

const PersonalInformation = () => {
  const [personalInfoState, dispatchFn] = useReducer(
    personalInfoReducer,
    initialState
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      dispatchFn({ type: "UPDATE_STORED_DATA", payload: location.state });
    } else {
      dispatchFn({ type: "UPDATE_USERID" });
    }
  }, []);

  const firstNameChangeHandler = (firstName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: firstName, name: "first_name" },
    });
  };

  const lastNameChangeHandler = (lastName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: lastName, name: "last_name" },
    });
  };

  const legalNameChangeHandler = (legalName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: legalName, name: "legal_name" },
    });
  };

  const fatherNameChangeHandler = (fatherName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: fatherName, name: "father_name" },
    });
  };

  const motherNameChangeHandler = (motherName) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: motherName, name: "mother_name" },
    });
  };

  const genderChangeHandler = (gender) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: {
        value: gender,
        name: "gender",
      },
    });
  };

  const maritalStatusChangeHandler = (maritalStatus) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: {
        value: maritalStatus,
        name: "marital_status",
      },
    });
  };

  const dobChangeChangeHandler = (dob) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: dob, name: "date_of_birth" },
    });
  };

  const bloodGroupChangeHandler = (bloodGroup) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: {
        value: bloodGroup,
        name: "blood_group",
      },
    });
  };

  const emailChangeHandler = (email) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: email, name: "email" },
    });
  };

  const locationChangeHandler = (location) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: location, name: "location" },
    });
  };

  const contactPersonalChangeHandler = (contactPersonal) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: contactPersonal, name: "contact_personal" },
    });
  };

  const contactFamilyChangeHandler = (contactFamily) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: contactFamily, name: "contact_family" },
    });
  };

  const emergencyNumberChangeHandler = (emergencyNumber) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: emergencyNumber, name: "emergency_number" },
    });
  };

  const dotChangeHandler = (dot) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: dot, name: "dot" },
    });
  };

  const dojChangeHandler = (doj) => {
    dispatchFn({ type: "UPDATE_FIELD", payload: { value: doj, name: "doj" } });
  };

  const aadharChangeHandler = (aadharNumber) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: aadharNumber, name: "aadhar_number" },
    });
  };

  const panChangeHandler = (panNumber) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: panNumber, name: "pan_number" },
    });
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      fetch(`${url}:${port}/user/profile/upload/${personalInfoState.user_id}`, {
        method: "POST",
        headers: {
          enctype: "multipart/form-data",
          Authorization: getAuthToken(),
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatchFn({
            type: "UPDATE_PROFILE_IMAGE",
            payload: {
              stored_filename: data.filename,
              original_filename: data.filename
                .trim()
                .split("_")
                .slice(3)
                .join(" "),
            },
          });
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fileChangeHandler = async (e) => {
    const inputButton = e.target;
    if (inputButton.value) {
      const file = e.target.files[0];
      await uploadFile(file);
    }
  };

  const buttonClickHandler = (e) => {
    e.preventDefault();
    document.querySelector("#real_input").click();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userPersonalData");
    sessionStorage.setItem(
      "userPersonalData",
      JSON.stringify({ personalInfoState })
    );
    navigate("/user/registration/boarding_info");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["personal-info-box"]}>
        <Input
          type="text"
          label="First Name"
          name="first_name"
          placeholder="First Name"
          value={personalInfoState.first_name}
          onChange={firstNameChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Last Name"
          value={personalInfoState.last_name}
          onChange={lastNameChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Legal Name"
          name="legal_name"
          placeholder="Legal Name"
          value={personalInfoState.legal_name}
          onChange={legalNameChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Father Name"
          name="father_name"
          placeholder="Father Name"
          value={personalInfoState.father_name}
          onChange={fatherNameChangeHandler}
          required={false}
        />
        <Input
          type="text"
          label="Mother Name"
          name="mother_name"
          placeholder="Mother Name"
          value={personalInfoState.mother_name}
          onChange={motherNameChangeHandler}
          required={false}
        />
        <Input
          type="date"
          label="Date Of Birth"
          name="date_of_birth"
          value={personalInfoState.date_of_birth}
          onChange={dobChangeChangeHandler}
          required={true}
        />
        <SelectInput
          name="gender"
          label="Gender"
          options={["Male", "Female", "Transgender"]}
          onChange={genderChangeHandler}
          value={personalInfoState.gender.data}
          required={false}
        />
        <SelectInput
          name="marital_status"
          label="Marital Status"
          options={["Married", "Unmarried", "Divorced", "Widow"]}
          onChange={maritalStatusChangeHandler}
          value={personalInfoState.marital_status.data}
          required={false}
        />
        <SelectInput
          name="blood_group"
          label="Blood Group"
          options={["O+ve", "O-ve", "B+ve", "B-ve", "AB+ve", "AB-ve"]}
          onChange={bloodGroupChangeHandler}
          value={personalInfoState.blood_group.data}
          required={false}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="email"
          value={personalInfoState.email}
          onChange={emailChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Location"
          name="location"
          placeholder="Location"
          value={personalInfoState.location}
          onChange={locationChangeHandler}
          required={false}
        />
        <Input
          type="text"
          label="Contact(Personal)"
          name="contact_personal"
          placeholder="Contact(Personal)"
          value={personalInfoState.contact_personal}
          onChange={contactPersonalChangeHandler}
          required={false}
        />
        <Input
          type="text"
          label="Contact(Family)"
          name="contact_family"
          placeholder="Contact(Family)"
          value={personalInfoState.contact_family}
          onChange={contactFamilyChangeHandler}
          required={false}
        />
        <Input
          type="text"
          label="Emergency Number"
          name="emergency_number"
          placeholder="Contact(Emergency)"
          value={personalInfoState.emergency_number}
          onChange={emergencyNumberChangeHandler}
          required={true}
        />
        <Input
          type="date"
          label="DOT"
          name="dot"
          value={personalInfoState.dot}
          onChange={dotChangeHandler}
          required={false}
        />
        <Input
          type="date"
          label="DOJ"
          name="doj"
          value={personalInfoState.doj}
          onChange={dojChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Aadhar Number"
          name="aadhar_number"
          placeholder="Aadhar"
          value={personalInfoState.aadhar_number}
          onChange={aadharChangeHandler}
          required={true}
        />
        <Input
          type="text"
          label="Pan Number"
          name="pan_number"
          placeholder="Pan"
          value={personalInfoState.pan_number}
          onChange={panChangeHandler}
          required={false}
        />
      </div>
      <div className={classes["profile-box"]}>
        <h2 className={classes["profile-heading"]}>Profile Image</h2>
        <div className={classes["image-section"]}>
          <div className={classes["image-container"]}>
            <div className={classes["img-area"]} data-img="data-img">
              {!personalInfoState.storedFileName ? (
                <>
                  <FontAwesomeIcon
                    icon={faFileImage}
                    className={classes.icon}
                  />
                  <h3>Image Preview</h3>
                </>
              ) : (
                <img
                  src={`${url}:${port}/public/users/${personalInfoState.user_id}/profile/${personalInfoState.storedFileName}`}
                  alt="Preview"
                  className={classes["preview-image"]}
                />
              )}
            </div>
          </div>
          <div>
            <input
              id="real_input"
              type="file"
              accept=".png, .jpeg, .jpg, .webp"
              onChange={fileChangeHandler}
              className={classes["real-input"]}
            />
            <div className={classes.wrapper}>
              <button
                type="button"
                className={classes["custom-input"]}
                onClick={buttonClickHandler}
              >
                {personalInfoState.storedFileName ? (
                  <>
                    <FontAwesomeIcon icon={faArrowRotateBackward} />
                    <span>Reupload</span>
                  </>
                ) : (
                  "Upload Image"
                )}
              </button>
              <span
                className={`${classes["file-name"]} ${
                  personalInfoState.storedFileName ? classes.active : ""
                }`}
              >
                {personalInfoState.originalFileName}
              </span>
            </div>
          </div>
        </div>
        <div className={classes["form-actions"]}>
          <Button className={classes.btn} type="submit">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
