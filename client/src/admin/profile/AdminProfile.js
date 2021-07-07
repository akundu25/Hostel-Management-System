import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, adminProfileUpdate } from "../../actions/admin.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.admin.profile);
  const [adminProfile, setAdminProfile] = useState(profile);
  const [isEditDisabled, setIsEditDisabled] = useState(true);

  useEffect(() => {
    !profile && dispatch(fetchAdminProfile());
    setAdminProfile(profile);
  }, [dispatch, profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminProfileUpdate(adminProfile));
    setIsEditDisabled(true);
  };

  return (
    <div className="profile-container">
      {(adminProfile && (
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
              value={adminProfile?.name || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setAdminProfile({ ...adminProfile, name: e.target.value })
              }
              required
            />
            <label htmlFor="email">EMAIL*</label>
            <input
              name="email"
              id="email"
              type="email"
              value={adminProfile?.email || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setAdminProfile({ ...adminProfile, email: e.target.value })
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

export default AdminProfile;
