import React, { useEffect, useReducer, useState } from "react";
import classes from "./LocationInformation.module.css";
import { Input, SelectInput } from "../../../../UI/Input/InputItem";
import Button from "../../../../UI/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  permanentAddress: {
    door_flat_no: "",
    street_block: "",
    area_village: "",
    landmark: "",
    taluk: "",
    post: "",
    pincode: "",
    country: { data: "India", value: "India" },
    state: { data: "Tamilnadu", value: "Tamilnadu" },
    city: { data: "Tiruchirapalli", value: "Tiruchirapalli" },
  },
  currentAddress: {
    door_flat_no: "",
    street_block: "",
    area_village: "",
    landmark: "",
    taluk: "",
    post: "",
    pincode: "",
    country: { data: "India", value: "India" },
    state: { data: "Tamilnadu", value: "Tamilnadu" },
    city: { data: "Tiruchirapalli", value: "Tiruchirapalli" },
  },
};

const locationInfoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERMANENT_ADDRESS":
      return {
        ...state,
        permanentAddress: {
          ...state.permanentAddress,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UPDATE_CURRENT_ADDRESS":
      return {
        ...state,
        currentAddress: {
          ...state.currentAddress,
          [action.payload.name]: action.payload.value,
        },
      };
    case "TOGGLE_SAME_AS_PERMANENT":
      return {
        ...state,
        currentAddress: action.checked
          ? { ...state.permanentAddress }
          : { ...initialState.currentAddress },
      };
    case "UPDATE_STORED_DATA":
      return {
        ...state,
        permanentAddress: {
          door_flat_no: action.payload.permanentAddress.door_flat_no,
          street_block: action.payload.permanentAddress.street_block,
          area_village: action.payload.permanentAddress.area_village,
          landmark: action.payload.permanentAddress.landmark,
          taluk: action.payload.permanentAddress.taluk,
          post: action.payload.permanentAddress.post,
          pincode: action.payload.permanentAddress.pincode,
          country: action.payload.permanentAddress.country,
          state: action.payload.permanentAddress.state,
          city: action.payload.permanentAddress.city,
        },
        currentAddress: {
          door_flat_no: action.payload.currentAddress.door_flat_no,
          street_block: action.payload.currentAddress.street_block,
          area_village: action.payload.currentAddress.area_village,
          landmark: action.payload.currentAddress.landmark,
          taluk: action.payload.currentAddress.taluk,
          post: action.payload.currentAddress.post,
          pincode: action.payload.currentAddress.pincode,
          country: action.payload.currentAddress.country,
          state: action.payload.currentAddress.state,
          city: action.payload.currentAddress.city,
        },
      };
    default:
      return state;
  }
};

const LocationInformation = () => {
  const [locationInfoState, dispatchFn] = useReducer(
    locationInfoReducer,
    initialState
  );
  const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      dispatchFn({
        type: "UPDATE_STORED_DATA",
        payload: location.state.locationInfoState,
      });
      setIsSameAsPermanent(location.state.isCurrentPermanentSame);
    }
  }, []);

  const checkboxChangeHandler = () => {
    dispatchFn({
      type: "TOGGLE_SAME_AS_PERMANENT",
      checked: !isSameAsPermanent,
    });
    setIsSameAsPermanent((prev) => !prev);
  };

  const doorFlatNoChangeHandler = (doorFlatNo) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: doorFlatNo, name: "door_flat_no" },
    });
  };

  const streetBlockChangeHandler = (streetBlock) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: streetBlock, name: "street_block" },
    });
  };

  const areaVillageChangeHandler = (areaVillage) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: areaVillage, name: "area_village" },
    });
  };

  const landmarkChangeHandler = (landmark) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: landmark, name: "landmark" },
    });
  };

  const talukChangeHandler = (taluk) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: taluk, name: "taluk" },
    });
  };

  const postChangeHandler = (post) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: post, name: "post" },
    });
  };

  const pincodeChangeHandler = (pincode) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: pincode, name: "pincode" },
    });
  };

  const countryChangeHandler = (country) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: country, name: "country" },
    });
  };

  const stateChangeHandler = (state) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: state, name: "state" },
    });
  };

  const cityChangeHandler = (city) => {
    dispatchFn({
      type: "UPDATE_PERMANENT_ADDRESS",
      payload: { value: city, name: "city" },
    });
  };

  const currentDoorFlatNoChangeHandler = (doorFlatNo) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: doorFlatNo, name: "door_flat_no" },
    });
  };

  const currentStreetBlockChangeHandler = (streetBlock) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: streetBlock, name: "street_block" },
    });
  };

  const currentAreaVillageChangeHandler = (areaVillage) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: areaVillage, name: "area_village" },
    });
  };

  const currentLandmarkChangeHandler = (landmark) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: landmark, name: "landmark" },
    });
  };

  const currentTalukChangeHandler = (taluk) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: taluk, name: "taluk" },
    });
  };

  const currentPostChangeHandler = (post) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: post, name: "post" },
    });
  };

  const currentPincodeChangeHandler = (pincode) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: pincode, name: "pincode" },
    });
  };

  const currentCountryChangeHandler = (country) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: country, name: "country" },
    });
  };

  const currentStateChangeHandler = (state) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: state, name: "state" },
    });
  };

  const currentCityChangeHandler = (city) => {
    dispatchFn({
      type: "UPDATE_CURRENT_ADDRESS",
      payload: { value: city, name: "city" },
    });
  };

  const previousNavigateHandler = () => {
    sessionStorage.removeItem("userLocationData");
    const userBoardingData = JSON.parse(
      sessionStorage.getItem("userBoardingData")
    );
    navigate("/user/registration/boarding_info", {
      state: userBoardingData.boardingInfoState,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userLocationData");
    sessionStorage.setItem(
      "userLocationData",
      JSON.stringify({
        locationInfoState,
        isCurrentPermanentSame: isSameAsPermanent,
      })
    );
    navigate("/user/registration/documents");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["permanent-address-box"]}>
        <h2>Permanent Address</h2>
        <div className={classes["permanent-address-input-box"]}>
          <Input
            type="text"
            label="Door/Flat No"
            name="door_flat_no"
            placeholder="Door/Flat No"
            onChange={doorFlatNoChangeHandler}
            value={locationInfoState.permanentAddress.door_flat_no}
            required
          />
          <Input
            type="text"
            label="Street/Block"
            name="street_block"
            placeholder="Street/Block"
            onChange={streetBlockChangeHandler}
            value={locationInfoState.permanentAddress.street_block}
            required
          />
          <Input
            type="text"
            label="Area/Village"
            name="area_village"
            placeholder="Area/Village"
            onChange={areaVillageChangeHandler}
            value={locationInfoState.permanentAddress.area_village}
            required
          />
          <Input
            type="text"
            label="Landmark"
            name="landmark"
            placeholder="Landmark"
            onChange={landmarkChangeHandler}
            value={locationInfoState.permanentAddress.landmark}
            required
          />
          <Input
            type="text"
            label="Taluk"
            name="taluk"
            placeholder="Taluk"
            onChange={talukChangeHandler}
            value={locationInfoState.permanentAddress.taluk}
            required
          />
          <Input
            type="text"
            label="Post"
            name="post"
            placeholder="Post"
            onChange={postChangeHandler}
            value={locationInfoState.permanentAddress.post}
            required
          />
          <Input
            type="text"
            label="Pincode"
            name="pincode"
            placeholder="Pincode"
            onChange={pincodeChangeHandler}
            value={locationInfoState.permanentAddress.pincode}
            required
          />
          <SelectInput
            name="country"
            label="Country"
            options={["India"]}
            onChange={countryChangeHandler}
            value={locationInfoState.permanentAddress.country.data}
            required={true}
          />
          <SelectInput
            name="state"
            label="State"
            options={["Tamilnadu"]}
            onChange={stateChangeHandler}
            value={locationInfoState.permanentAddress.state.data}
            required={true}
          />
          <SelectInput
            name="city"
            label="City"
            options={["Tiruchirapalli"]}
            onChange={cityChangeHandler}
            value={locationInfoState.permanentAddress.city.data}
            required={true}
          />
        </div>
      </div>
      <div className={classes["current-address-box"]}>
        <h2>Current Address</h2>
        <div className={classes["address-checkbox"]}>
          <input
            type="checkbox"
            name="address"
            id="address"
            checked={isSameAsPermanent}
            onChange={checkboxChangeHandler}
          />
          <p>Same as permanent address</p>
        </div>
        <div className={classes["current-address-input-box"]}>
          <Input
            type="text"
            label="Door/Flat No"
            name="door_flat_no"
            placeholder="Door/Flat No"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.door_flat_no
                : locationInfoState.currentAddress.door_flat_no
            }
            onChange={!isSameAsPermanent && currentDoorFlatNoChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Street/Block"
            name="street_block"
            placeholder="Street/Block"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.street_block
                : locationInfoState.currentAddress.street_block
            }
            onChange={!isSameAsPermanent && currentStreetBlockChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Area/Village"
            name="area_village"
            placeholder="Area/Village"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.area_village
                : locationInfoState.currentAddress.area_village
            }
            onChange={!isSameAsPermanent && currentAreaVillageChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Landmark"
            name="landmark"
            placeholder="Landmark"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.landmark
                : locationInfoState.currentAddress.landmark
            }
            onChange={!isSameAsPermanent && currentLandmarkChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Taluk"
            name="taluk"
            placeholder="Taluk"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.taluk
                : locationInfoState.currentAddress.taluk
            }
            onChange={!isSameAsPermanent && currentTalukChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Post"
            name="post"
            placeholder="Post"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.post
                : locationInfoState.currentAddress.post
            }
            onChange={!isSameAsPermanent && currentPostChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <Input
            type="text"
            label="Pincode"
            name="pincode"
            placeholder="Pincode"
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.pincode
                : locationInfoState.currentAddress.pincode
            }
            onChange={!isSameAsPermanent && currentPincodeChangeHandler}
            disabled={isSameAsPermanent}
            required
          />
          <SelectInput
            name="country"
            label="Country"
            options={["India"]}
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.country.data
                : locationInfoState.currentAddress.country.data
            }
            onChange={!isSameAsPermanent && currentCountryChangeHandler}
            disabled={isSameAsPermanent}
            required={true}
          />
          <SelectInput
            name="state"
            label="State"
            options={["Tamilnadu"]}
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.state.data
                : locationInfoState.currentAddress.state.data
            }
            onChange={!isSameAsPermanent && currentStateChangeHandler}
            disabled={isSameAsPermanent}
            required={true}
          />
          <SelectInput
            name="city"
            label="City"
            options={["Tiruchirapalli"]}
            value={
              isSameAsPermanent
                ? locationInfoState.permanentAddress.city.data
                : locationInfoState.currentAddress.city.data
            }
            onChange={!isSameAsPermanent && currentCityChangeHandler}
            disabled={isSameAsPermanent}
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

export default LocationInformation;
