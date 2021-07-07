import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WardenForm from "./warden form/WardenForm.js";
import { getWardens, deleteWarden, wardenSignup } from "../../actions/admin.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

import "./AssignWarden.css";

const initialWardenData = {
  name: "",
  email: "",
  mobile: "",
  designation: "",
  year: "",
  password: "",
  confirmPassword: "",
};

const AssignWarden = () => {
  const dispatch = useDispatch();
  const wardenOneProfile = useSelector((state) => state.admin.wardenOneData);
  const wardenTwoProfile = useSelector((state) => state.admin.wardenTwoData);
  const errorMessage = useSelector((state) => state.admin.error);
  const [error, setError] = useState(errorMessage);
  const [wardenOne, setWardenOne] = useState(
    wardenOneProfile || initialWardenData
  );
  const [wardenTwo, setWardenTwo] = useState(
    wardenTwoProfile || initialWardenData
  );
  const [isDisabledWardenOne, setIsDisabledWardenOne] = useState(false);
  const [isDisabledWardenTwo, setIsDisabledWardenTwo] = useState(false);
  const [year, setYear] = useState(null);

  useEffect(() => {
    wardenOneProfile?.year === year && setWardenOne(wardenOneProfile);
    wardenTwoProfile?.year === year && setWardenTwo(wardenTwoProfile);

    if (wardenOneProfile) setIsDisabledWardenOne(true);
    else setIsDisabledWardenOne(false);

    if (wardenTwoProfile) setIsDisabledWardenTwo(true);
    else setIsDisabledWardenTwo(false);

    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      errorMessage && setError(null);
      dispatch({ type: "REMOVE_ERROR" });
    }, 2000);
  }, [dispatch, wardenOneProfile, wardenTwoProfile, year, errorMessage]);

  const handleSubmitWardenOne = (e) => {
    e.preventDefault();
    dispatch(wardenSignup({ ...wardenOne, year }));
  };

  const handleSubmitWardenTwo = (e) => {
    e.preventDefault();
    dispatch(wardenSignup({ ...wardenTwo, year }));
  };

  const handleChange = (e) => {
    setYear(parseInt(e.target.value));
    dispatch(getWardens(parseInt(e.target.value)));
    setWardenOne({ ...initialWardenData, year: parseInt(e.target.value) });
    setWardenTwo({ ...initialWardenData, year: parseInt(e.target.value) });
  };

  const handleRemoveWardenOne = (e) => {
    e.preventDefault();
    dispatch(deleteWarden(wardenOne._id));
    setWardenOne({ ...initialWardenData, year });
  };

  const handleRemoveWardenTwo = (e) => {
    e.preventDefault();
    dispatch(deleteWarden(wardenTwo._id));
    setWardenTwo({ ...initialWardenData, year });
  };

  return (
    <div className="warden-select-container">
      <div className="warden-select-inner-container">
        <div className="select-year">
          <label htmlFor="year">Select year:</label>
          <select
            id="year"
            className="year-selection"
            name="year"
            onChange={handleChange}
            required
          >
            <option value={0}>Select a year</option>
            <option value={1}>1st</option>
            <option value={2}>2nd</option>
            <option value={3}>3rd</option>
            <option value={4}>4th</option>
          </select>
          <button
            type="button"
            className="warden-remove-btn"
            onClick={handleRemoveWardenOne}
          >
            Remove Warden 1
          </button>
          <button
            type="button"
            className="warden-remove-btn"
            onClick={handleRemoveWardenTwo}
          >
            Remove Warden 2
          </button>
        </div>

        {year ? (
          <div className="select-warden">
            {error &&
              error.map((err, indx) => (
                <div key={indx} className="signup-error-message">
                  {err.msg}
                </div>
              ))}
            <form className="warden-info" onSubmit={handleSubmitWardenOne}>
              <WardenForm
                wardenData={wardenOne}
                setWarden={setWardenOne}
                number="1"
                disabled={isDisabledWardenOne}
              />
              <button
                type="submit"
                disabled={isDisabledWardenOne}
                className={
                  isDisabledWardenOne
                    ? "warden-signup-disabled"
                    : "warden-signup-btn"
                }
              >
                SIGNUP WARDEN 1
              </button>
            </form>
            <br />
            <form className="warden-info" onSubmit={handleSubmitWardenTwo}>
              <WardenForm
                wardenData={wardenTwo}
                setWarden={setWardenTwo}
                number="2"
                disabled={isDisabledWardenTwo}
              />
              <button
                type="submit"
                disabled={isDisabledWardenTwo}
                className={
                  isDisabledWardenTwo
                    ? "warden-signup-disabled"
                    : "warden-signup-btn"
                }
              >
                SIGNUP WARDEN 2
              </button>
            </form>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default AssignWarden;
