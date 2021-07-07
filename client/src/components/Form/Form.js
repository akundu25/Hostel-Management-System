import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerStudent } from "../../actions/students.js";
import FileBase from "react-file-base64";
import * as images from "../../assets/images";
import * as icons from "../../assets/icons";
import "./Form.css";

const initialFormData = {
  name: "",
  roll: "",
  email: "",
  mobile_number: "",
  parent_name: "",
  parent_email: "",
  parent_mobile_number: "",
  semester: "",
  year: "",
  stream: "",
  room_number: "",
  selectedFile: images.profileImage,
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector((state) => state.students.error);
  const [error, setError] = useState(errorMessage);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      dispatch({ type: "STUDENT_AUTH_ERROR_REMOVE" });
      setError(null);
    }, 5000);
  }, [dispatch, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerStudent(formData, history));
    setFormData(initialFormData);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );

  return (
    <div className="form-container">
      {error &&
        error.map((err, indx) => (
          <div key={indx} className="student-register-error-message">
            {err.msg}
          </div>
        ))}
      <form
        className="registration-form"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <div className="fileInput">
          <img
            src={formData.selectedFile}
            className="profile-pic"
            alt="profile"
            height="100px"
            width="100px"
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setFormData({ ...formData, selectedFile: base64 });
            }}
          />
        </div>
        <div className="input-double">
          <label htmlFor="name">NAME*</label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            placeholder="eg: Arnab Kundu"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label htmlFor="roll">ROLL NUMBER*</label>
          <input
            name="roll"
            id="roll"
            type="text"
            value={formData.roll}
            placeholder="eg: CSE/17/44"
            onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
            required
          />
        </div>
        <div className="input-double">
          <label htmlFor="email">EMAIL*</label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            placeholder="eg: akundu@gmail.com"
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
            value={formData.mobile_number}
            placeholder="eg: 8490679834"
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
            value={formData.parent_name}
            placeholder="eg: Subrato Kundu"
            onChange={(e) =>
              setFormData({ ...formData, parent_name: e.target.value })
            }
          />
          <label htmlFor="parent_mobile">PARENT'S MOBILE NUMBER</label>
          <input
            name="parent_mobile"
            id="parent_mobile"
            type="tel"
            value={formData.parent_mobile}
            placeholder="eg: 8490679834"
            onChange={(e) =>
              setFormData({ ...formData, parent_mobile_number: e.target.value })
            }
          />
        </div>
        <div className="input-double">
          <label htmlFor="parent_email">PARENT'S EMAIL</label>
          <input
            name="parent_email"
            id="parent_email"
            type="email"
            value={formData.parent_email}
            placeholder="eg: skundu@gmail.com"
            onChange={(e) =>
              setFormData({ ...formData, parent_email: e.target.value })
            }
          />
          <label htmlFor="semester">SEMESTER*</label>
          <input
            type="number"
            name="semester"
            id="semester"
            value={formData.semester}
            placeholder="eg: 4"
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
            value={formData.year}
            placeholder="eg: 1"
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
          <label htmlFor="stream">STREAM*</label>
          <input
            type="text"
            name="stream"
            id="stream"
            value={formData.stream}
            placeholder="eg: Computer Science and Engineering"
            onChange={(e) =>
              setFormData({ ...formData, stream: e.target.value })
            }
            required
          />
        </div>
        <div className="input-double">
          <label htmlFor="password">PASSWORD*</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <img
            src={showPassword ? icons.invisibleIcon : icons.visibleIcon}
            alt="password visibility control"
            className="pwd-visibility"
            onClick={handleShowPassword}
          />
          <label htmlFor="confirmPassword">CONFIRM PASSWORD*</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <img
            src={showConfirmPassword ? icons.invisibleIcon : icons.visibleIcon}
            alt="password visibility control"
            className="pwd-visibility"
            onClick={handleShowConfirmPassword}
          />
        </div>
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
