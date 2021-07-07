import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  applyOnceMore,
  fetchStudent,
  studentProfileUpdate,
} from "../../actions/students.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

import "./StudentProfile.css";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const studentProfile = useSelector((state) => state.students.profile);
  const [formData, setFormData] = useState(studentProfile);

  useEffect(() => {
    studentProfile === null && dispatch(fetchStudent());
    setFormData(studentProfile);
  }, [dispatch, studentProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(studentProfileUpdate(formData));
    setIsEditDisabled(true);
  };

  const handleApplyAgain = (e) => {
    e.preventDefault();
    dispatch(applyOnceMore(formData?._id));
  };

  return (
    <div className="profile-container">
      {(formData && (
        <form
          className="profile-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="profile-top-section">
            {formData?.selectedFile === "" ? (
              <span className="profile-pic">{formData?.name.charAt(0)}</span>
            ) : (
              <img
                src={formData?.selectedFile}
                className="profile-pic"
                alt=""
                height="100px"
                width="100px"
              />
            )}
            {!isEditDisabled && (
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setFormData({ ...formData, selectedFile: base64 });
                }}
              />
            )}
            <button
              disabled={formData?.application_status === "Pending"}
              className={
                formData?.application_status === "Pending"
                  ? "btn-disabled"
                  : "apply-again"
              }
              onClick={handleApplyAgain}
            >
              APPLY AGAIN
            </button>
          </div>
          <div className="input-double">
            <label htmlFor="name">NAME*</label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData?.name || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <label htmlFor="roll">ROLL NUMBER*</label>
            <input
              name="roll"
              id="roll"
              type="text"
              value={formData?.roll || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, roll: e.target.value })
              }
              required
            />
          </div>
          <div className="input-double">
            <label htmlFor="email">EMAIL*</label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData?.email || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <label htmlFor="mobile">MOBILE NUMBER*</label>
            <input
              name="mobile"
              id="mobile"
              type="tel"
              value={formData?.mobile_number || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, mobile_number: e.target.value })
              }
              required
            />
          </div>
          <div className="input-double">
            <label htmlFor="parent_name">PARENT'S NAME</label>
            <input
              name="parent_name"
              id="parent_name"
              type="text"
              value={formData?.parent_name || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, parent_name: e.target.value })
              }
            />
            <label htmlFor="parent_mobile">PARENT'S MOBILE NUMBER</label>
            <input
              name="parent_mobile"
              id="parent_mobile"
              type="tel"
              value={formData?.parent_mobile_number || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  parent_mobile_number: e.target.value,
                })
              }
            />
          </div>
          <div className="input-double">
            <label htmlFor="room_number">ROOM NUMBER</label>
            <input
              name="room_number"
              id="room_number"
              type="text"
              value={formData?.room_number || ""}
              disabled
            />
            <label htmlFor="semester">SEMESTER*</label>
            <input
              type="number"
              name="semester"
              id="semester"
              value={formData?.semester || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
              required
            />
          </div>
          <div className="input-double">
            <label htmlFor="year">CURRENT YEAR*</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData?.year || ""}
              placeholder="eg: 1"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
            <label htmlFor="stream">STREAM*</label>
            <input
              type="text"
              name="stream"
              id="stream"
              value={formData?.stream || ""}
              disabled={isEditDisabled}
              onChange={(e) =>
                setFormData({ ...formData, stream: e.target.value })
              }
              required
            />
          </div>
          <div className="input-double">
            <label htmlFor="status">APPLICATION STATUS</label>
            <textarea
              id="status"
              name="status"
              rows={2}
              cols={130}
              value={formData?.application_status || ""}
              disabled
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

export default StudentProfile;
