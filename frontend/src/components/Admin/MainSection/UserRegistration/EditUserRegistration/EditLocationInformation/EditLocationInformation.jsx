import React, { useEffect, useReducer, useState } from "react";
import classes from "./EditLocationInformation.module.css";
import { useNavigate } from "react-router-dom";
import { Input, SelectInput } from "../../../../../UI/Input/InputItem";
import Button from "../../../../../UI/Button/Button";

const initialState = {
  permanent_address: {
    door_flat_no: "",
    street_block: "",
    area_village: "",
    landmark: "",
    taluk: "",
    post: "",
    pincode: "",
    country: { data: "", value: "" },
    state: { data: "", value: "" },
    city: { data: "", value: "" },
  },
  current_address: {
    door_flat_no: "",
    street_block: "",
    area_village: "",
    landmark: "",
    taluk: "",
    post: "",
    pincode: "",
    country: { data: "", value: "" },
    state: { data: "", value: "" },
    city: { data: "", value: "" },
  },
};

const locationInfoReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERMANENT_ADDRESS":
      if (
        action.payload.name === "country" ||
        action.payload.name === "state" ||
        action.payload.name === "city"
      ) {
        return {
          ...state,
          permanent_address: {
            ...state.permanent_address,
            [action.payload.name]: JSON.stringify(action.payload.value),
          },
        };
      } else {
        return {
          ...state,
          permanent_address: {
            ...state.permanent_address,
            [action.payload.name]: action.payload.value,
          },
        };
      }

    case "UPDATE_CURRENT_ADDRESS":
      if (
        action.payload.name === "country" ||
        action.payload.name === "state" ||
        action.payload.name === "city"
      ) {
        return {
          ...state,
          current_address: {
            ...state.current_address,
            [action.payload.name]: JSON.stringify(action.payload.value),
          },
        };
      } else {
        return {
          ...state,
          current_address: {
            ...state.current_address,
            [action.payload.name]: action.payload.value,
          },
        };
      }

    case "TOGGLE_SAME_AS_PERMANENT":
      return {
        ...state,
        current_address: action.checked
          ? { ...state.permanent_address }
          : { ...initialState.current_address },
      };
    case "UPDATE_STORED_DATA":
      return {
        ...state,
        permanent_address: {
          door_flat_no: action.payload.permanent_address.door_flat_no,
          street_block: action.payload.permanent_address.street_block,
          area_village: action.payload.permanent_address.area_village,
          landmark: action.payload.permanent_address.landmark,
          taluk: action.payload.permanent_address.taluk,
          post: action.payload.permanent_address.post,
          pincode: action.payload.permanent_address.pincode,
          country:
            typeof action.payload.permanent_address.country === "string"
              ? JSON.parse(action.payload.permanent_address.country)
              : action.payload.permanent_address.country,
          state:
            typeof action.payload.permanent_address.state === "string"
              ? JSON.parse(action.payload.permanent_address.state)
              : action.payload.permanent_address.state,
          city:
            typeof action.payload.permanent_address.city === "string"
              ? JSON.parse(action.payload.permanent_address.city)
              : action.payload.permanent_address.city,
        },
        current_address: {
          door_flat_no: action.payload.current_address.door_flat_no,
          street_block: action.payload.current_address.street_block,
          area_village: action.payload.current_address.area_village,
          landmark: action.payload.current_address.landmark,
          taluk: action.payload.current_address.taluk,
          post: action.payload.current_address.post,
          pincode: action.payload.current_address.pincode,
          country:
            typeof action.payload.current_address.country === "string"
              ? JSON.parse(action.payload.current_address.country)
              : action.payload.current_address.country,
          state:
            typeof action.payload.current_address.state === "string"
              ? JSON.parse(action.payload.current_address.state)
              : action.payload.current_address.state,
          city:
            typeof action.payload.current_address.city === "string"
              ? JSON.parse(action.payload.current_address.city)
              : action.payload.current_address.city,
        },
      };
    default:
      return state;
  }
};

const EditLocationInformation = () => {
  const [locationInfoState, dispatchFn] = useReducer(
    locationInfoReducer,
    initialState
  );
  const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocationData = JSON.parse(
      sessionStorage.getItem("editUserLocationInfo")
    );
    dispatchFn({
      type: "UPDATE_STORED_DATA",
      payload: userLocationData,
    });
    setIsSameAsPermanent(userLocationData.isCurrentPermanentSame);
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

  const previousNavigateHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("editUserLocationInfo");
    sessionStorage.setItem(
      "editUserLocationInfo",
      JSON.stringify({
        ...locationInfoState,
        isCurrentPermanentSame: isSameAsPermanent,
      })
    );
    navigate(
      `/user/registration/edit/boarding_info?userId=${sessionStorage.getItem(
        "userId"
      )}`
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("editUserLocationInfo");
    sessionStorage.setItem(
      "editUserLocationInfo",
      JSON.stringify({
        ...locationInfoState,
        isCurrentPermanentSame: isSameAsPermanent,
      })
    );
    navigate(
      `/user/registration/edit/documents?userId=${sessionStorage.getItem(
        "userId"
      )}`
    );
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
            value={locationInfoState.permanent_address.door_flat_no}
            required
          />
          <Input
            type="text"
            label="Street/Block"
            name="street_block"
            placeholder="Street/Block"
            onChange={streetBlockChangeHandler}
            value={locationInfoState.permanent_address.street_block}
            required
          />
          <Input
            type="text"
            label="Area/Village"
            name="area_village"
            placeholder="Area/Village"
            onChange={areaVillageChangeHandler}
            value={locationInfoState.permanent_address.area_village}
            required
          />
          <Input
            type="text"
            label="Landmark"
            name="landmark"
            placeholder="Landmark"
            onChange={landmarkChangeHandler}
            value={locationInfoState.permanent_address.landmark}
            required
          />
          <Input
            type="text"
            label="Taluk"
            name="taluk"
            placeholder="Taluk"
            onChange={talukChangeHandler}
            value={locationInfoState.permanent_address.taluk}
            required
          />
          <Input
            type="text"
            label="Post"
            name="post"
            placeholder="Post"
            onChange={postChangeHandler}
            value={locationInfoState.permanent_address.post}
            required
          />
          <Input
            type="text"
            label="Pincode"
            name="pincode"
            placeholder="Pincode"
            onChange={pincodeChangeHandler}
            value={locationInfoState.permanent_address.pincode}
            required
          />
          <SelectInput
            name="country"
            label="Country"
            options={["India"]}
            onChange={countryChangeHandler}
            value={locationInfoState.permanent_address.country.data}
            required={true}
          />
          <SelectInput
            name="state"
            label="State"
            options={["Tamilnadu"]}
            onChange={stateChangeHandler}
            value={locationInfoState.permanent_address.state.data}
            required={true}
          />
          <SelectInput
            name="city"
            label="City"
            options={["Tiruchirapalli"]}
            onChange={cityChangeHandler}
            value={locationInfoState.permanent_address.city.data}
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
                ? locationInfoState.permanent_address.door_flat_no
                : locationInfoState.current_address.door_flat_no
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
                ? locationInfoState.permanent_address.street_block
                : locationInfoState.current_address.street_block
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
                ? locationInfoState.permanent_address.area_village
                : locationInfoState.current_address.area_village
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
                ? locationInfoState.permanent_address.landmark
                : locationInfoState.current_address.landmark
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
                ? locationInfoState.permanent_address.taluk
                : locationInfoState.current_address.taluk
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
                ? locationInfoState.permanent_address.post
                : locationInfoState.current_address.post
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
                ? locationInfoState.permanent_address.pincode
                : locationInfoState.current_address.pincode
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
                ? locationInfoState.permanent_address.country.data
                : locationInfoState.current_address.country.data
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
                ? locationInfoState.permanent_address.state.data
                : locationInfoState.current_address.state.data
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
                ? locationInfoState.permanent_address.city.data
                : locationInfoState.current_address.city.data
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

export default EditLocationInformation;
