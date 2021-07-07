import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewNotices, removeWardenNotice } from "../../actions/warden.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";
import * as icons from "../../assets/icons";

import "./Notice.css";

const ViewNotice = () => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.warden.notices);
  const [wardenNotices, setWardenNotices] = useState(notices);

  useEffect(() => {
    !notices && dispatch(viewNotices());
    setWardenNotices(notices);
  }, [dispatch, notices]);

  const handleDeleteNotice = (noticeId) => {
    dispatch(removeWardenNotice(noticeId));
  };

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
                  <div className="notice-delete">
                    <img
                      src={icons.deleteDarkIcon}
                      alt="delete-notice-btn"
                      className="notice-delete-btn"
                      onClick={() => handleDeleteNotice(notice._id)}
                    />
                  </div>
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

export default ViewNotice;
