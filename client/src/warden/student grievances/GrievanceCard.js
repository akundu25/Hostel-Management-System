import React from "react";
import { useDispatch } from "react-redux";
import {
  grievanceStatusChange,
  removeGrievance,
} from "../../actions/warden.js";
import * as icons from "../../assets/icons";

import "./GrievanceStyles.css";

const GrievanceCard = ({ grievance }) => {
  const dispatch = useDispatch();

  const handleClick = (grievanceId) => {
    dispatch(grievanceStatusChange(grievanceId));
  };

  const handleDeleteGrievance = (grievanceId) => {
    dispatch(removeGrievance(grievanceId));
  };

  return (
    <div className="grievance-card">
      <div className="grievance-heading">
        <span className="grievance-room-number">Room: {grievance.room}</span>
        <span className="grievance-name">{grievance.name}</span>
        <span className="grievance-date">
          Date: {grievance.date.substring(0, 10)}
        </span>
      </div>
      <div className="grievance-text">{grievance.grievance}</div>
      <div className="grievance-status">
        <span
          className={
            grievance.status === "Active"
              ? "grievance-status-bg active-status"
              : "grievance-status-bg resolved-status"
          }
        >
          {grievance.status}
        </span>
        <span className="change-grievance-status">
          <button
            className="change-grievance-status-btn"
            onClick={() => handleClick(grievance._id)}
          >
            CHANGE STATUS
          </button>
        </span>
        <span className="delete-grievance">
          <img
            src={icons.deleteDarkIcon}
            alt="delete-grievance"
            className="delete-grievance-icon"
            onClick={() => handleDeleteGrievance(grievance._id)}
          />
        </span>
      </div>
    </div>
  );
};

export default GrievanceCard;
