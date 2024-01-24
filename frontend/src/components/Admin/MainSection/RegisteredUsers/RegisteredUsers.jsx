import React, { useState } from "react";
import classes from "./RegisteredUsers.module.css";
import { useUsers } from "../../../../store/UsersContext/UserContextProvider";
import MainHeader from "../../../UI/MainHeader/MainHeader";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  calculateExperience,
  threeDigitMonthDateConverter,
} from "../../../Utils/calculateData";
import { Input, SelectInput } from "../../../UI/Input/InputItem";
import UserDetailViewModal from "./UserDetailViewModal/UserDetailViewModal";
import { useNavigate } from "react-router-dom";

const RegisteredUsers = () => {
  const { registeredUsers, deleteUserDataHandler } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserData, setSelectedUserData] = useState({});
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);

  const navigate = useNavigate();

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const filteredEntries = registeredUsers.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.personal_details.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(registeredUsers.length / entriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const showEntriesChangeHandler = (entries) => {
    setCurrentPage(1);
    setEntriesPerPage(entries.data);
  };

  const searchChangeHandler = (searchValue) => {
    setCurrentPage(1);
    setSearchTerm(searchValue);
  };

  const viewUserDetailHandler = async (item) => {
    setSelectedUserData(item);
    setShowUserDetailModal(true);
  };

  const editUserDetailHandler = (userData) => {
    sessionStorage.removeItem("editUserPersonalInfo");
    sessionStorage.removeItem("editUserBoardingInfo");
    sessionStorage.removeItem("editUserLocationInfo");
    sessionStorage.removeItem("editDocumentsInfo");
    sessionStorage.setItem(
      "editUserPersonalInfo",
      JSON.stringify({
        ...userData.personal_details,
        user_id: userData.userID,
      })
    );
    sessionStorage.setItem(
      "editUserBoardingInfo",
      JSON.stringify({
        ...userData.boarding_details,
        username: userData.username,
        company_name: userData.company_name,
      })
    );
    sessionStorage.setItem(
      "editUserLocationInfo",
      JSON.stringify(userData.location_details)
    );
    sessionStorage.setItem(
      "editDocumentsInfo",
      JSON.stringify(userData.education_details)
    );
    sessionStorage.setItem("userId", userData.userID);
    navigate(`/user/registration/edit/personal_info?userId=${userData.userID}`);
  };

  const closeUserDetailModal = async () => {
    setSelectedUserData({});
    setShowUserDetailModal(false);
  };

  const deleteUserDetailHandler = async (item) => {
    await deleteUserDataHandler(item._id, item.userID);
  };

  return (
    <>
      {showUserDetailModal && (
        <UserDetailViewModal
          title="User Registration Details"
          userData={selectedUserData}
          onClose={closeUserDetailModal}
        />
      )}
      <div>
        <MainHeader heading="Registered Users" className={classes.header} />
        <div className={classes["show-entries-search-box"]}>
          <div className={classes["show-entries-box"]}>
            <SelectInput
              name="show_entries"
              label="Show Entries"
              options={[2, 4, 10, 20, 30, 50]}
              onChange={showEntriesChangeHandler}
              value={entriesPerPage}
              required={false}
            />
          </div>
          <form className={classes["search-box"]}>
            <Input
              type="text"
              label="Search"
              name="search"
              placeholder="Search"
              onChange={searchChangeHandler}
              value={searchTerm}
              required={false}
            />
          </form>
        </div>
        <div className={classes["user-details-container"]}>
          <ul className={classes["user-details-list-headings"]}>
            <li>S.No</li>
            <li>Emp code</li>
            <li>Company</li>
            <li>User Name</li>
            <li>Email</li>
            <li>Branch</li>
            <li>Team</li>
            <li>Unit</li>
            <li>DOJ</li>
            <li>Experience</li>
            <li>Status</li>
            <li>Action</li>
          </ul>
          {registeredUsers.length > 0 ? (
            currentEntries.map((item, index) => (
              <ul className={classes["user-details-lists"]} key={index}>
                <li>{indexOfFirstEntry + index + 1}</li>
                <li>{item.boarding_details.employee_code}</li>
                <li>{item.boarding_details.company.data}</li>
                <li>{item.username}</li>
                <li>{item.personal_details.email}</li>
                <li>{item.boarding_details.branch.data}</li>
                <li>{item.boarding_details.team.data}</li>
                <li>{item.boarding_details.unit.data}</li>
                <li>
                  {threeDigitMonthDateConverter(item.personal_details.doj)}
                </li>
                <li>{calculateExperience(item.personal_details.doj)}</li>
                <li>{item.status}</li>
                <li className={classes["action-btns-box"]}>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => viewUserDetailHandler(item)}
                    className={classes["view-icon"]}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => editUserDetailHandler(item)}
                    className={classes["view-icon"]}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUserDetailHandler(item)}
                    className={classes["delete-icon"]}
                  />
                </li>
              </ul>
            ))
          ) : (
            <p className={classes["no-data"]}>No rows</p>
          )}
        </div>
        {registeredUsers.length > 0 && (
          <div className={classes["pagination-container"]}>
            <div className={classes["entries-count-box"]}>
              <p>
                Showing {indexOfFirstEntry + 1} to{" "}
                {Math.min(indexOfLastEntry, registeredUsers.length)} of{" "}
                {registeredUsers.length} entries
              </p>
            </div>
            <div className={classes["pagination-container"]}>
              <button
                className={classes["pagination-btn"]}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={classes["pagination-icon"]}
                />
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={classes["pagination-icon"]}
                />
              </button>
              <button
                className={classes["pagination-btn"]}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={classes["pagination-icon"]}
                />
              </button>
              <button
                className={classes["pagination-btn"]}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={classes["pagination-icon"]}
                />
              </button>
              <button
                className={classes["pagination-btn"]}
                onClick={() => setCurrentPage(pageNumbers.length)}
                disabled={currentPage === pageNumbers.length}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={classes["pagination-icon"]}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={classes["pagination-icon"]}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisteredUsers;
