import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wardenNoticeMessages } from "../../actions/warden.js";

import "./Notice.css";

const initialNotice = {
  name: "",
  year: "",
  date: new Date(),
  message: "",
};

const Notice = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userProfile")).localProfile;
  const notices = useSelector((state) => state.warden.notices);
  const [notice, setNotice] = useState({
    ...initialNotice,
    name: user.name,
    year: user.year,
  });

  const clear = () => {
    setNotice({
      ...notice,
      message: "",
      date: "",
    });
  };

  const handleSendNotice = () => {
    dispatch(wardenNoticeMessages(notice));
    clear();
  };

  console.log(notices);

  return (
    <div className="warden-notice-container">
      <div className="warden-notice-inner-container">
        <label htmlFor="name">NAME*</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="eg: Arnab Kundu"
          value={notice.name}
          onChange={(e) => setNotice({ ...notice, name: e.target.value })}
          required
        />
        <label htmlFor="date">DATE*</label>
        <input
          type="date"
          id="date"
          name="date"
          value={notice.date}
          onChange={(e) => setNotice({ ...notice, date: e.target.value })}
          required
        />
        <label htmlFor="year">YEAR*</label>
        <input
          type="year"
          id="year"
          name="year"
          value={notice.year}
          onChange={(e) => setNotice({ ...notice, year: e.target.value })}
          required
        />
        <label htmlFor="message">MESSAGE*</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          columns={40}
          value={notice.message}
          onChange={(e) => setNotice({ ...notice, message: e.target.value })}
          required
        />
        <button onClick={handleSendNotice}>SEND NOTICE</button>
      </div>
    </div>
  );
};

export default Notice;
