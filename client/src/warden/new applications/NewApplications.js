import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnallocatedStudents } from "../../actions/warden.js";
import StudentCard from "./StudentCard.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

import "./NewApplications.css";

const NewApplications = () => {
  const newApplicants = useSelector(
    (state) => state.warden.unallocatedStudents
  );
  const [newStudents, setNewStudents] = useState(newApplicants);
  const year = JSON.parse(localStorage.getItem("userProfile")).localProfile
    .year;
  const dispatch = useDispatch();

  useEffect(() => {
    !newApplicants && dispatch(fetchUnallocatedStudents(year));
    setNewStudents(newApplicants);
  }, [dispatch, newApplicants, year]);

  return (
    <div className="new-application-container">
      <div className="new-application-inner-container">
        {newStudents ? (
          newStudents.length ? (
            newStudents.map((student, indx) => (
              <StudentCard key={indx} student={student} year={year} />
            ))
          ) : (
            <div className="no-new-applicants">No new applicants...</div>
          )
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default NewApplications;
