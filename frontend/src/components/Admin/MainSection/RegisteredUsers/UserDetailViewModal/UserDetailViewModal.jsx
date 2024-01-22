import React from "react";
import ReactDOM from "react-dom";
import classes from "./UserDetailViewModal.module.css";
import Backdrop from "../../../../UI/Backdrop/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFileImage } from "@fortawesome/free-solid-svg-icons";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

const ModalOverlay = ({ title, userData, onClose }) => {
  const {
    personal_details,
    boarding_details,
    location_details,
    education_details,
  } = userData;

  const educationDetails = JSON.parse(education_details.education_details);

  const pCountry = JSON.parse(location_details.permanent_address.country).data;
  const pState = JSON.parse(location_details.permanent_address.state).data;
  const pCity = JSON.parse(location_details.permanent_address.city).data;
  const cCountry = JSON.parse(location_details.current_address.country).data;
  const cState = JSON.parse(location_details.current_address.state).data;
  const cCity = JSON.parse(location_details.current_address.city).data;

  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        <FontAwesomeIcon
          icon={faClose}
          className={classes["close-icon"]}
          onClick={onClose}
        />
      </header>
      <main className={classes.content}>
        <section className={classes["personal-info-section"]}>
          <h2>Personal Details</h2>
          <div className={classes["personal-info-box"]}>
            <div className={classes["two-col-section"]}>
              <div className={classes.detail}>
                <p>UserID</p>
                <h3>{userData.userID}</h3>
              </div>
              <div className={classes.detail}>
                <p>Username</p>
                <h3>{userData.username}</h3>
              </div>
              <div className={classes["profile-image-box"]}>
                {personal_details.storedFileName ? (
                  <div className={classes["profile-img"]}>
                    <img
                      src={`${url}:${port}/public/users/${userData.userID}/profile/${personal_details.storedFileName}`}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div className={classes["preview-box"]}>
                    <FontAwesomeIcon
                      icon={faFileImage}
                      className={classes.icon}
                    />
                    <h3>Image Preview</h3>
                  </div>
                )}
              </div>
              <div className={classes.detail}>
                <p>First Name</p>
                <h3>{personal_details.first_name}</h3>
              </div>
              <div className={classes.detail}>
                <p>Last Name</p>
                <h3>{personal_details.last_name}</h3>
              </div>
            </div>
            <div className={classes.detail}>
              <p>Legal Name</p>
              <h3>{personal_details.legal_name}</h3>
            </div>
            <div className={classes.detail}>
              <p>Gender</p>
              <h3>{personal_details.gender.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Father Name</p>
              <h3>{personal_details.father_name}</h3>
            </div>
            <div className={classes.detail}>
              <p>Mother Name</p>
              <h3>{personal_details.mother_name}</h3>
            </div>
            <div className={classes.detail}>
              <p>Marital Status</p>
              <h3>{personal_details.marital_status.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Blood Group</p>
              <h3>{personal_details.blood_group.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Date Of Birth</p>
              <h3>{personal_details.date_of_birth}</h3>
            </div>
            <div className={classes.detail}>
              <p>Email</p>
              <h3>{personal_details.email}</h3>
            </div>
            <div className={classes.detail}>
              <p>Location</p>
              <h3>{personal_details.location}</h3>
            </div>
            <div className={classes.detail}>
              <p>Contact(Personal)</p>
              <h3>{personal_details.contact_personal}</h3>
            </div>
            <div className={classes.detail}>
              <p>Contact(Family)</p>
              <h3>{personal_details.contact_family}</h3>
            </div>
            <div className={classes.detail}>
              <p>Emergency No</p>
              <h3>{personal_details.emergency_number}</h3>
            </div>
            <div className={classes.detail}>
              <p>DOT</p>
              <h3>{personal_details.dot}</h3>
            </div>
            <div className={classes.detail}>
              <p>DOJ</p>
              <h3>{personal_details.doj}</h3>
            </div>
            <div className={classes.detail}>
              <p>Aadhar No</p>
              <h3>{personal_details.aadhar_number}</h3>
            </div>
            <div className={classes.detail}>
              <p>PAN No</p>
              <h3>{personal_details.pan_number}</h3>
            </div>
          </div>
        </section>
        <section className={classes["boarding-info-section"]}>
          <h2>Boarding Details</h2>
          <div className={classes["boarding-info-box"]}>
            <div className={classes.detail}>
              <p>Company</p>
              <h3>{boarding_details.company.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Branch</p>
              <h3>{boarding_details.branch.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Unit</p>
              <h3>{boarding_details.unit.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Floor</p>
              <h3>{boarding_details.floor.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Department</p>
              <h3>{boarding_details.department.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Team</p>
              <h3>{boarding_details.team.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Designation</p>
              <h3>{boarding_details.designation.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Shift Timing</p>
              <h3>{boarding_details.shift_timing.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Week Off</p>
              <h3>{boarding_details.week_off.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Reporting To</p>
              <h3>{boarding_details.reporting_to.data}</h3>
            </div>
            <div className={classes.detail}>
              <p>Employee Code</p>
              <h3>{boarding_details.employee_code}</h3>
            </div>
            <div className={classes.detail}>
              <p>Work Station</p>
              <h3>{boarding_details.work_station.data}</h3>
            </div>
          </div>
        </section>
        <section className={classes["location-info-section"]}>
          <h2>Location Details</h2>
          <div className={classes["location-info-box"]}>
            <div className={classes["permanent-address-box"]}>
              <h3>Permanent Address</h3>
              <div className={classes["permanent-address-details"]}>
                <div className={classes.detail}>
                  <p>Door/Flat No</p>
                  <h3>{location_details.permanent_address.door_flat_no}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Street/Block</p>
                  <h3>{location_details.permanent_address.street_block}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Area/Village</p>
                  <h3>{location_details.permanent_address.area_village}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Landmark</p>
                  <h3>{location_details.permanent_address.landmark}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Taluk</p>
                  <h3>{location_details.permanent_address.taluk}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Post</p>
                  <h3>{location_details.permanent_address.post}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Pincode</p>
                  <h3>{location_details.permanent_address.pincode}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Country</p>
                  <h3>{pCountry}</h3>
                </div>
                <div className={classes.detail}>
                  <p>State</p>
                  <h3>{pState}</h3>
                </div>
                <div className={classes.detail}>
                  <p>City</p>
                  <h3>{pCity}</h3>
                </div>
              </div>
            </div>
            <div className={classes["current-address-box"]}>
              <h3>Current Address</h3>
              <div className={classes["current-address-details"]}>
                <div className={classes.detail}>
                  <p>Door/Flat No</p>
                  <h3>{location_details.current_address.door_flat_no}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Street/Block</p>
                  <h3>{location_details.current_address.street_block}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Area/Village</p>
                  <h3>{location_details.current_address.area_village}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Landmark</p>
                  <h3>{location_details.current_address.landmark}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Taluk</p>
                  <h3>{location_details.current_address.taluk}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Post</p>
                  <h3>{location_details.current_address.post}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Pincode</p>
                  <h3>{location_details.current_address.pincode}</h3>
                </div>
                <div className={classes.detail}>
                  <p>Country</p>
                  <h3>{cCountry}</h3>
                </div>
                <div className={classes.detail}>
                  <p>State</p>
                  <h3>{cState}</h3>
                </div>
                <div className={classes.detail}>
                  <p>City</p>
                  <h3>{cCity}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={classes["education-info-section"]}>
          <h2>Education Details</h2>
          <div className={classes["education-details-container"]}>
            <ul className={classes["education-details-list-headings"]}>
              <li>S No</li>
              <li>Qualification</li>
              <li>Institution</li>
              <li>Passed Year</li>
              <li>% or CGPA</li>
            </ul>
            {educationDetails.map((item, index) => (
              <ul className={classes["education-details-lists"]} key={index}>
                <li>{index + 1}</li>
                <li>{item.qualification.data}</li>
                <li>{item.institution}</li>
                <li>{item.passedYear}</li>
                <li>{item.cgpa}</li>
              </ul>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const UserDetailViewModal = ({ title, userData, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} userData={userData} onClose={onClose} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UserDetailViewModal;
