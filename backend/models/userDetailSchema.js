const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personalDetailSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  legal_name: { type: String },
  father_name: { type: String },
  mother_name: { type: String },
  gender: { data: { type: String }, value: { type: String } },
  marital_status: { data: { type: String }, value: { type: String } },
  blood_group: { data: { type: String }, value: { type: String } },
  date_of_birth: { type: String },
  email: { type: String },
  location: { type: String },
  contact_personal: { type: String },
  contact_family: { type: String },
  emergency_number: { type: String },
  dot: { type: String },
  doj: { type: String },
  aadhar_number: { type: String },
  pan_number: { type: String },
  storedFileName: { type: String },
  originalFileName: { type: String },
});

const boardingDetailSchema = new Schema({
  company: { data: { type: String }, value: { type: String } },
  branch: { data: { type: String }, value: { type: String } },
  unit: { data: { type: String }, value: { type: String } },
  floor: { data: { type: String }, value: { type: String } },
  department: { data: { type: String }, value: { type: String } },
  team: { data: { type: String }, value: { type: String } },
  designation: { data: { type: String }, value: { type: String } },
  shift_timing: { data: { type: String }, value: { type: String } },
  week_off: { data: { type: String }, value: { type: String } },
  reporting_to: { data: { type: String }, value: { type: String } },
  employee_code: { type: String },
  work_station: { data: { type: String }, value: { type: String } },
});

const addressSchema = new Schema({
  door_flat_no: { type: String },
  street_block: { type: String },
  area_village: { type: String },
  landmark: { type: String },
  taluk: { type: String },
  post: { type: String },
  pincode: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
});

const locationDetailSchema = new Schema({
  permanent_address: { type: addressSchema },
  current_address: { type: addressSchema },
  isCurrentPermanentSame: { type: Boolean },
});

const educationDetailSchema = new Schema({
  education_details: { type: String },
  documents: { type: String },
});

const userRegistrationDetailSchema = new Schema(
  {
    userID: { type: String },
    username: { type: String },
    password: { type: String },
    company_name: { type: String },
    personal_details: { type: personalDetailSchema },
    boarding_details: { type: boardingDetailSchema },
    location_details: { type: locationDetailSchema },
    education_details: { type: educationDetailSchema },
    status: { type: String },
  },
  { timestamps: true }
);

const UserDetailModel = mongoose.model(
  "UserDetail",
  userRegistrationDetailSchema
);

module.exports = UserDetailModel;
