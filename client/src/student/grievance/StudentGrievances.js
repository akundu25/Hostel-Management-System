import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table.js";
import GrievanceForm from "./grievance form/GrievanceForm.js";
import { fetchGrievances, fetchStudent } from "../../actions/students.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

import "./StudentGrievances.css";

const columns = ["room", "date", "grievance", "status"];

const StudentGrievances = () => {
  const dispatch = useDispatch();
  const studentGrievances = useSelector((state) => state.students.grievances);
  const studentProfile = useSelector((state) => state.students.profile);
  const [profile, setProfile] = useState(studentProfile);
  const [grievances, setGrievances] = useState(
    studentGrievances.length ? studentGrievances : null
  );

  useEffect(() => {
    grievances === null && dispatch(fetchGrievances());
    setGrievances(studentGrievances);
    studentProfile === null && dispatch(fetchStudent());
    setProfile(studentProfile);
  }, [dispatch, studentGrievances, grievances, studentProfile]);

  const handleClick = () => {
    dispatch(fetchGrievances());
  };

  return (
    <div className="grievance-main-container">
      {studentProfile && grievances ? (
        <div className="grievance-inner-container">
          <div className="grievances-table">
            <button
              type="button"
              onClick={handleClick}
              className="grievances-load-btn"
            >
              REFRESH
            </button>
            {studentGrievances.length ? (
              <Table columns={columns} content={grievances} />
            ) : (
              <span className="no-grievances-message">
                No grievances reported yet.
              </span>
            )}
          </div>
          <div className="grievance-report-form">
            <h4 className="report-grievance-heading">Report Your Grievance</h4>
            {profile && <GrievanceForm profile={profile} />}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default StudentGrievances;
