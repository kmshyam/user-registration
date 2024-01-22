const bcrypt = require("bcrypt");
const UserDetail = require("../models/userDetailSchema");
const saltRounds = 10;

exports.postUserRegistrationData = async (req, res) => {
  const {
    loginDetails,
    personalDetails,
    boardingDetails,
    locationDetails,
    education_details,
    status,
  } = req.body;
  bcrypt.genSalt(saltRounds, (saltError, saltValue) => {
    if (!saltError) {
      bcrypt.hash(
        loginDetails.password,
        saltValue,
        async (hashError, hashValue) => {
          if (!hashError) {
            try {
              const userDetails = await UserDetail.create({
                userID: loginDetails.user_id,
                username: loginDetails.username,
                password: hashValue,
                company_name: loginDetails.company_name,
                personal_details: {
                  first_name: personalDetails.first_name,
                  last_name: personalDetails.last_name,
                  legal_name: personalDetails.legal_name,
                  father_name: personalDetails.father_name,
                  mother_name: personalDetails.mother_name,
                  gender: personalDetails.gender,
                  marital_status: personalDetails.marital_status,
                  blood_group: personalDetails.blood_group,
                  date_of_birth: personalDetails.date_of_birth,
                  email: personalDetails.email,
                  location: personalDetails.location,
                  contact_personal: personalDetails.contact_personal,
                  contact_family: personalDetails.contact_family,
                  emergency_number: personalDetails.emergency_number,
                  dot: personalDetails.dot,
                  doj: personalDetails.doj,
                  aadhar_number: personalDetails.aadhar_number,
                  pan_number: personalDetails.pan_number,
                  storedFileName: personalDetails.storedFileName,
                  originalFileName: personalDetails.originalFileName,
                },
                boarding_details: {
                  company: boardingDetails.company,
                  branch: boardingDetails.branch,
                  unit: boardingDetails.unit,
                  floor: boardingDetails.floor,
                  department: boardingDetails.department,
                  team: boardingDetails.team,
                  designation: boardingDetails.designation,
                  shift_timing: boardingDetails.shift_timing,
                  week_off: boardingDetails.week_off,
                  reporting_to: boardingDetails.reporting_to,
                  employee_code: boardingDetails.employee_code,
                  work_station: boardingDetails.work_station,
                },
                location_details: {
                  permanent_address: {
                    door_flat_no: locationDetails.permanentAddress.door_flat_no,
                    street_block: locationDetails.permanentAddress.street_block,
                    area_village: locationDetails.permanentAddress.area_village,
                    landmark: locationDetails.permanentAddress.area_village,
                    taluk: locationDetails.permanentAddress.taluk,
                    post: locationDetails.permanentAddress.post,
                    pincode: locationDetails.permanentAddress.pincode,
                    country: locationDetails.permanentAddress.country,
                    state: locationDetails.permanentAddress.state,
                    city: locationDetails.permanentAddress.city,
                  },
                  current_address: {
                    door_flat_no: locationDetails.currentAddress.door_flat_no,
                    street_block: locationDetails.currentAddress.street_block,
                    area_village: locationDetails.currentAddress.area_village,
                    landmark: locationDetails.currentAddress.landmark,
                    taluk: locationDetails.currentAddress.taluk,
                    post: locationDetails.currentAddress.post,
                    pincode: locationDetails.currentAddress.pincode,
                    country: locationDetails.currentAddress.country,
                    state: locationDetails.currentAddress.state,
                    city: locationDetails.currentAddress.city,
                  },
                },
                education_details: {
                  education_details: education_details.education_details,
                  documents: education_details.documents,
                },
                status,
              });
              res.status(200).json({
                status: "Success",
                message: "User details added successfully",
                userDetails,
              });
            } catch (err) {
              res.status(400).json({
                status: "Failed",
                message: err.message,
              });
            }
          } else {
            res.status(400).json({
              status: "Failed",
              message: "Failed to store the data",
            });
          }
        }
      );
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Failed store the data",
      });
    }
  });
};

exports.getAllRegisteredUsersData = async (req, res) => {
  try {
    const registeredUsers = await UserDetail.find().sort({ _id: -1 });
    res.status(200).json({
      status: "Success",
      message: "All registered users fetched successfully",
      registeredUsers,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteUserData = async (req, res) => {
  try {
    const registeredUsers = await UserDetail.deleteOne({ _id: req.params.id });
    if (registeredUsers.deletedCount) {
      res.status(200).json({
        status: "Success",
        message: "User data deleted successfully.",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Something went wrong. Unable to delete the user data.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
