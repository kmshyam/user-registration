import React, { useContext, useEffect, useState } from "react";
import UsersContext from "./users-context";
import { getAuthToken } from "../../components/Utils/auth";

const url = import.meta.env.VITE_REACT_APP_URL;
const port = import.meta.env.VITE_REACT_APP_PORT;

const UsersContextProvider = ({ children }) => {
  const [status, setStatus] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchAllRegisteredUsers = async () => {
      const response = await fetch(`${url}:${port}/user/detail/all`, {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
      });
      const data = await response.json();
      if (data.status === "Success") {
        setRegisteredUsers(data.registeredUsers);
      }
    };
    fetchAllRegisteredUsers();
  }, [status]);

  const addUserRegistrationDetailsHandler = async (
    personalInfo,
    boardingInfo,
    locationInfo,
    documentsInfo
  ) => {
    try {
      const requiredFields = [
        personalInfo.user_id,
        boardingInfo.username,
        boardingInfo.password,
        boardingInfo.company_name,
        personalInfo.first_name,
        personalInfo.last_name,
        personalInfo.legal_name,
        personalInfo.father_name,
        personalInfo.mother_name,
        personalInfo.gender.data,
        personalInfo.marital_status.data,
        personalInfo.blood_group.data,
        personalInfo.date_of_birth,
        personalInfo.email,
        personalInfo.location,
        personalInfo.contact_personal,
        personalInfo.contact_family,
        personalInfo.emergency_number,
        personalInfo.dot,
        personalInfo.doj,
        personalInfo.aadhar_number,
        personalInfo.pan_number,
        personalInfo.storedFileName,
        personalInfo.originalFileName,
        boardingInfo.company,
        boardingInfo.branch,
        boardingInfo.unit,
        boardingInfo.floor,
        boardingInfo.department,
        boardingInfo.team,
        boardingInfo.designation,
        boardingInfo.shift_timing,
        boardingInfo.week_off,
        boardingInfo.reporting_to,
        boardingInfo.employee_code,
        boardingInfo.work_station,
        locationInfo.permanentAddress.door_flat_no,
        locationInfo.permanentAddress.street_block,
        locationInfo.permanentAddress.area_village,
        locationInfo.permanentAddress.landmark,
        locationInfo.permanentAddress.taluk,
        locationInfo.permanentAddress.post,
        locationInfo.permanentAddress.pincode,
        JSON.stringify(locationInfo.permanentAddress.country),
        JSON.stringify(locationInfo.permanentAddress.state),
        JSON.stringify(locationInfo.permanentAddress.city),
        locationInfo.currentAddress.door_flat_no,
        locationInfo.currentAddress.street_block,
        locationInfo.currentAddress.area_village,
        locationInfo.currentAddress.landmark,
        locationInfo.currentAddress.taluk,
        locationInfo.currentAddress.post,
        locationInfo.currentAddress.pincode,
        JSON.stringify(locationInfo.currentAddress.country),
        JSON.stringify(locationInfo.currentAddress.state),
        JSON.stringify(locationInfo.currentAddress.city),
        JSON.stringify(documentsInfo.education_details),
        JSON.stringify(documentsInfo.documents),
      ];

      const isAnyFieldEmpty = requiredFields.some(
        (field) => field === "" || field === null || field === undefined
      );

      const status = isAnyFieldEmpty ? "Incomplete" : "Complete";

      const userRegistrationData = {
        loginDetails: {
          user_id: personalInfo.user_id,
          username: boardingInfo.username,
          password: boardingInfo.password,
          company_name: boardingInfo.company_name,
        },
        personalDetails: {
          first_name: personalInfo.first_name,
          last_name: personalInfo.last_name,
          legal_name: personalInfo.legal_name,
          father_name: personalInfo.father_name,
          mother_name: personalInfo.mother_name,
          gender: personalInfo.gender,
          marital_status: personalInfo.marital_status,
          blood_group: personalInfo.blood_group,
          date_of_birth: personalInfo.date_of_birth,
          email: personalInfo.email,
          location: personalInfo.location,
          contact_personal: personalInfo.contact_personal,
          contact_family: personalInfo.contact_family,
          emergency_number: personalInfo.emergency_number,
          dot: personalInfo.dot,
          doj: personalInfo.doj,
          aadhar_number: personalInfo.aadhar_number,
          pan_number: personalInfo.pan_number,
          storedFileName: personalInfo.storedFileName,
          originalFileName: personalInfo.originalFileName,
        },
        boardingDetails: {
          company: boardingInfo.company,
          branch: boardingInfo.branch,
          unit: boardingInfo.unit,
          floor: boardingInfo.floor,
          department: boardingInfo.department,
          team: boardingInfo.team,
          designation: boardingInfo.designation,
          shift_timing: boardingInfo.shift_timing,
          week_off: boardingInfo.week_off,
          reporting_to: boardingInfo.reporting_to,
          employee_code: boardingInfo.employee_code,
          work_station: boardingInfo.work_station,
        },
        locationDetails: {
          permanentAddress: {
            door_flat_no: locationInfo.permanentAddress.door_flat_no,
            street_block: locationInfo.permanentAddress.street_block,
            area_village: locationInfo.permanentAddress.area_village,
            landmark: locationInfo.permanentAddress.landmark,
            taluk: locationInfo.permanentAddress.taluk,
            post: locationInfo.permanentAddress.post,
            pincode: locationInfo.permanentAddress.pincode,
            country: JSON.stringify(locationInfo.permanentAddress.country),
            state: JSON.stringify(locationInfo.permanentAddress.state),
            city: JSON.stringify(locationInfo.permanentAddress.city),
          },
          currentAddress: {
            door_flat_no: locationInfo.currentAddress.door_flat_no,
            street_block: locationInfo.currentAddress.street_block,
            area_village: locationInfo.currentAddress.area_village,
            landmark: locationInfo.currentAddress.landmark,
            taluk: locationInfo.currentAddress.taluk,
            post: locationInfo.currentAddress.post,
            pincode: locationInfo.currentAddress.pincode,
            country: JSON.stringify(locationInfo.currentAddress.country),
            state: JSON.stringify(locationInfo.currentAddress.state),
            city: JSON.stringify(locationInfo.currentAddress.city),
          },
        },
        education_details: {
          education_details: JSON.stringify(documentsInfo.education_details),
          documents: JSON.stringify(documentsInfo.documents),
        },
        status,
      };
      const response = await fetch(`${url}:${port}/user/detail/form/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthToken(),
        },
        body: JSON.stringify(userRegistrationData),
      });
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteUserDataHandler = async (id) => {
    try {
      const response = await fetch(`${url}:${port}/user/detail/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: getAuthToken(),
        },
      });
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        registeredUsers,
        addUserRegistrationDetailsHandler,
        deleteUserDataHandler,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const userCtx = useContext(UsersContext);
  return userCtx;
};

export default UsersContextProvider;
