import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentGrievances } from "../../actions/warden.js";
import GrievanceCard from "./GrievanceCard.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

import "./GrievanceStyles.css";

const Grievances = () => {
  const dispatch = useDispatch();
  const grievances = useSelector((state) => state.warden.grievances);
  const [studentGrievances, setStudentGrievances] = useState(grievances);

  useEffect(() => {
    !grievances && dispatch(getStudentGrievances());
    setStudentGrievances(grievances);
  }, [dispatch, grievances]);

  console.log(studentGrievances);

  return (
    <div className="warden-grievance-container">
      <h2 className="grievances-top-text">Grievances</h2>
      {studentGrievances ? (
        studentGrievances.length ? (
          studentGrievances.map((grievance, indx) => (
            <div key={indx}>
              <GrievanceCard grievance={grievance} />
              <br />
            </div>
          ))
        ) : (
          <h4 className="no-grievances-reported">
            No Grievances reported yet...(REFRESH TO UPDATE LIST OF GRIEVANCES)
          </h4>
        )
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Grievances;
