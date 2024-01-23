import React, { useEffect, useReducer, useState } from "react";
import classes from "./Documents.module.css";
import { Input, SelectInput } from "../../../../UI/Input/InputItem";
import Button from "../../../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUpload,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useUsers } from "../../../../../store/UsersContext/UserContextProvider";
import { getAuthToken } from "../../../../Utils/auth";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

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
  const [personalInfo, setPersonalInfo] = useState({});
  const { addUserRegistrationDetailsHandler } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const { personalInfoState } = JSON.parse(
      sessionStorage.getItem("userPersonalData")
    );
    if (sessionStorage.getItem("userDocuments")) {
      const userData = JSON.parse(sessionStorage.getItem("userDocuments"));
      dispatchFn({
        type: "UPDATE_FIELD",
        payload: { value: userData, name: "documents" },
      });
    }
    setPersonalInfo(personalInfoState);
  }, []);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        `${url}:${port}/user/detail/upload/files/${personalInfo.user_id}`,
        {
          method: "POST",
          headers: {
            enctype: "multipart/form-data",
            Authorization: getAuthToken(),
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        const userDocuments = sessionStorage.getItem("userDocuments");
        if (!userDocuments) {
          sessionStorage.setItem(
            "userDocuments",
            JSON.stringify([data.fileDetail])
          );
          dispatchFn({
            type: "UPDATE_FIELD",
            payload: {
              value: [...documentsState.documents, data.fileDetail],
              name: "documents",
            },
          });
        } else {
          const userDocumentsArr = JSON.parse(userDocuments);
          const updatedDocumentsArr = [...userDocumentsArr, data.fileDetail];
          sessionStorage.removeItem("userDocuments");
          sessionStorage.setItem(
            "userDocuments",
            JSON.stringify(updatedDocumentsArr)
          );
          dispatchFn({
            type: "UPDATE_FIELD",
            payload: { value: updatedDocumentsArr, name: "documents" },
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const documentFileChangeHandler = async (e) => {
    const documentFile = e.target.files[0];
    await uploadFile(documentFile);
  };

  const uploadDocumentButtonClickHandler = (e) => {
    e.preventDefault();
    document.querySelector(`#document_file`).click();
  };

  const downloadDocumentHandler = async (file) => {
    try {
      const response = await fetch(
        `${url}:${port}/user/detail/document/download?userID=${personalInfo.user_id}&file=${file.storedFileName}`,
        {
          method: "GET",
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = file.originalFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("Failed to download document.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDocumentHandler = async (file) => {
    try {
      const response = await fetch(
        `${url}:${port}/user/detail/document/delete?userID=${personalInfo.user_id}&file=${file.storedFileName}`,
        {
          method: "PUT",
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    const userDocuments = JSON.parse(sessionStorage.getItem("userDocuments"));
    const filteredDocuments = userDocuments.filter(
      (document) => document.storedFileName !== file.storedFileName
    );
    sessionStorage.removeItem("userDocuments");
    sessionStorage.setItem("userDocuments", JSON.stringify(filteredDocuments));
    dispatchFn({
      type: "UPDATE_FIELD",
      payload: { value: filteredDocuments, name: "documents" },
    });
  };

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

  const previousNavigateHandler = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userDocuments");
    const userLocationData = JSON.parse(
      sessionStorage.getItem("userLocationData")
    );
    try {
      const response = await fetch(
        `${url}:${port}/user/detail/documents/delete/all?userID=${personalInfo.user_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
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
    sessionStorage.removeItem("userDocuments");
    navigate("/user/registration/personal_info");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["documents-box"]}>
        <div className={classes["document-header-box"]}>
          <h2>Documents</h2>
          <div className={classes["file-form-controls"]}>
            <div>
              <input
                id={`document_file`}
                type="file"
                name={`document_file`}
                accept=".docx, .pdf"
                onChange={(e) => documentFileChangeHandler(e)}
                className={classes["real-input"]}
              />
              <div className={classes.wrapper}>
                <button
                  type="button"
                  className={classes["custom-input"]}
                  onClick={(e) => uploadDocumentButtonClickHandler(e)}
                >
                  <FontAwesomeIcon
                    icon={faCloudUpload}
                    className={classes["cloud-icon"]}
                  />
                  <p>Upload document</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["document-details-container"]}>
          <ul className={classes["document-details-list-headings"]}>
            <li>S No</li>
            <li>Document</li>
            <li>Remarks</li>
            <li>View</li>
            <li>Action</li>
          </ul>
          {documentsState.documents.map((item, index) => (
            <ul className={classes["document-details-lists"]} key={index}>
              <li>{index + 1}</li>
              <li>{item.originalFileName}</li>
              <li>Approved</li>
              <li>
                <FontAwesomeIcon
                  icon={faDownload}
                  className={classes["download-icon"]}
                  onClick={() => downloadDocumentHandler(item)}
                />
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={classes["delete-icon"]}
                  onClick={() => deleteDocumentHandler(item)}
                />
              </li>
            </ul>
          ))}
        </div>
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
