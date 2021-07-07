import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoginModalStyle } from "./LoginModalStyle.js";
import { passwordReset } from "../../actions/resetPassword.js";
import "./LoginModalContentStyle.css";

const initialPassword = {
  password: "",
  confirmPassword: "",
};

const PasswordReset = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState(initialPassword);
  const errorMessage = useSelector((state) => state.resetPassword.error);
  const resetPasswordInfo = JSON.parse(
    localStorage.getItem("passwordResetInfo")
  );

  useEffect(() => {
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      dispatch({ type: "ERROR_REMOVE" });
      setError("");
    }, 5000);
  }, [dispatch, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      passwordReset(
        resetPasswordInfo?.userType,
        resetPasswordInfo?.id,
        resetPasswordInfo?.token,
        newPassword,
        history
      )
    );
  };

  return (
    <Modal style={LoginModalStyle} isOpen={true}>
      <h2 className="heading">Enter New Password</h2>
      <form className="set-new-password-form" onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) =>
            setNewPassword({ ...newPassword, confirmPassword: e.target.value })
          }
          required
        />
        <button type="submit" className="log-btn">
          CHANGE PASSWORD
        </button>
        {error &&
          error.map((err, indx) => (
            <div key={indx} className="error-message">
              {err.msg}
            </div>
          ))}
      </form>
    </Modal>
  );
};

export default PasswordReset;
