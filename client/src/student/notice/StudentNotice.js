import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardenNotices } from "../../actions/students.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

const StudentNotice = () => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.students.notices);
  const [wardenNotices, setWardenNotices] = useState(notices);

  useEffect(() => {
    !notices && dispatch(fetchWardenNotices());
    setWardenNotices(notices);
  }, [dispatch, notices]);

  return (
    <div className="notice-display-container">
      <div className="notice-display-inner-container">
        <h2 className="warden-notices-heading">WARDEN NOTICES</h2>
        {wardenNotices ? (
          wardenNotices.length ? (
            wardenNotices.map((notice, indx) => (
              <div key={indx}>
                <div className="notice-display">
                  <div className="notice-display-heading">
                    <span className="warden-name">{notice.name}</span>
                    <span className="notice-date">
                      Date: {notice.date.substring(0, 10)}
                    </span>
                  </div>
                  <div className="notice-message">{notice.message}</div>
                </div>
                <br />
              </div>
            ))
          ) : (
            <span className="no-notices-message">No notices sent yet...</span>
          )
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default StudentNotice;
