import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { grievanceReport } from "../../../actions/students.js";

import "./GrievanceForm.css";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  roll: "",
  room: "",
  date: "",
  year: "",
  grievance: "",
};

const GrievanceForm = ({ profile }) => {
  const [formData, setFormData] = useState({
    ...initialForm,
    name: profile?.name,
    roll: profile?.roll,
    email: profile?.email,
    mobile: profile?.mobile_number,
    room: profile?.room_number || "",
    year: profile?.year,
  });
  const dispatch = useDispatch();

  const clear = () => {
    setFormData({ ...formData, date: "", grievance: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(grievanceReport(formData));
    clear();
  };

  return (
    <form onSubmit={handleSubmit} className="grievance-form">
      <label htmlFor="name">NAME*</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="eg: Arnab Kundu"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        required
      />
      <label htmlFor="email">EMAIL*</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="eg: akundu@gmail.com"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        required
      />
      <label htmlFor="mobile">MOBILE NUMBER*</label>
      <input
        type="tel"
        id="mobile"
        name="mobile"
        value={formData.mobile}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        required
      />
      <label htmlFor="roll">ROLL*</label>
      <input
        type="text"
        id="roll"
        name="roll"
        value={formData.roll}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        required
      />
      <label htmlFor="room">ROOM NUMBER*</label>
      <input
        type="text"
        id="room"
        name="room"
        value={formData.room}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        required
      />
      <div className="dual-input">
        <label htmlFor="date">DATE*</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        <label htmlFor="year">YEAR*</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
      </div>
      <label htmlFor="grievance">GRIEVANCE*</label>
      <textarea
        id="grievance"
        name="grievance"
        rows="5"
        cols="40"
        value={formData.grievance}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
      ></textarea>
      <button type="submit" className="grievance-form-btn">
        SUBMIT
      </button>
    </form>
  );
};

export default GrievanceForm;
