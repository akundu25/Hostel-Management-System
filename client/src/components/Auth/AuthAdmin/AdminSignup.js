import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminSignup } from "../../../actions/admin.js";
import * as icons from "../../../assets/icons";

import "./AdminSignup.css";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AdminSignup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const errorMessage = useSelector((state) => state.admin.error);
  const [error, setError] = useState(errorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      dispatch({ type: "REMOVE_ERROR" });
      setError(null);
    }, 5000);
  }, [dispatch, errorMessage]);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminSignup(formData, history));
  };

  return (
    <form className="adminSignup" onSubmit={handleSubmit}>
      {error &&
        error.map((err, indx) => (
          <div key={indx} className="admin-error-message">
            {err.msg}
          </div>
        ))}
      <div className="double-input">
        <label htmlFor="name">NAME*</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="eg: Arnab Kundu"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">EMAIL*</label>
        <input
          type="email"
          name="email"
          placeholder="eg: akundu@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="double-input">
        <label htmlFor="pwd">PASSWORD*</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="pwd"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <img
          src={showPassword ? icons.invisibleIcon : icons.visibleIcon}
          alt="password visibility control"
          className="pwd-visibility"
          onClick={handleShowPassword}
        />
        <label htmlFor="confirmPwd">CONFIRM PASSWORD*</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          id="confirmPwd"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <img
          src={showConfirmPassword ? icons.invisibleIcon : icons.visibleIcon}
          alt="password visibility control"
          className="pwd-visibility"
          onClick={handleShowConfirmPassword}
        />
      </div>
      <button type="submit" className="admin-signup-btn">
        SIGN UP
      </button>
    </form>
  );
};

export default AdminSignup;
