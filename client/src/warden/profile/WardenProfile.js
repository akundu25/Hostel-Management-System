import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardenProfile, updateProfile } from "../../actions/warden.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

const WardenProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.warden.profile);
  const [wardenProfile, setWardenProfile] = useState(profile);
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  useEffect(() => {
    !profile && dispatch(fetchWardenProfile());
    setWardenProfile(profile);
  }, [dispatch, profile]);

  console.log(wardenProfile);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(wardenProfile));
    setIsEditDisabled(true);
  };

  return (
    <div className="profile-container">
      {(wardenProfile && (
        <form
          className="profile-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="input-double">
            <label htmlFor="name">NAME*</label>
            <input
              name="name"
              id="name"
              type="text"
              value={wardenProfile?.name || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setWardenProfile({ ...wardenProfile, name: e.target.value })
              }
              required
            />
            <label htmlFor="email">EMAIL*</label>
            <input
              name="email"
              id="email"
              type="email"
              value={wardenProfile?.email || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setWardenProfile({ ...wardenProfile, email: e.target.value })
              }
              required
            />
          </div>
          <div className="input-double">
            <label htmlFor="mobile">MOBILE NUMBER*</label>
            <input
              name="mobile"
              id="mobile"
              type="tel"
              value={wardenProfile?.mobile || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setWardenProfile({ ...wardenProfile, mobile: e.target.value })
              }
              required
            />
            <label htmlFor="year">CURRENT YEAR*</label>
            <input
              type="number"
              id="year"
              name="year"
              value={wardenProfile?.year || ""}
              placeholder="eg: 1"
              disabled={isEditDisabled}
              onChange={(e) =>
                setWardenProfile({ ...wardenProfile, year: e.target.value })
              }
            />
          </div>
          <div className="input-double">
            <label htmlFor="designation">DESIGNATION*</label>
            <input
              type="text"
              name="designation"
              id="designation"
              value={wardenProfile?.designation || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setWardenProfile({
                  ...wardenProfile,
                  designation: e.target.value,
                })
              }
              required
            />
          </div>
          {isEditDisabled ? (
            <button
              className="edit-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsEditDisabled(false);
              }}
            >
              EDIT PROFILE
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          )}
        </form>
      )) || <LoadingScreen />}
    </div>
  );
};

export default WardenProfile;
