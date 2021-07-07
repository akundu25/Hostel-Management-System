import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoginModalStyle } from "./LoginModalStyle.js";
import { linkForPasswordReset } from "../../actions/resetPassword.js";
import "./LoginModalContentStyle.css";

const initialFormData = {
  email: "",
  password: "",
};

const initialPasswordResetEmail = {
  email: "",
};

const LoginModal = ({
  showModal,
  setShowModal,
  subheading,
  action,
  errorMessage,
  errorCodeRemoveType,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [passwordResetEmail, setPasswordResetEmail] = useState(
    initialPasswordResetEmail
  );
  const [forgetPassword, setForgetPassword] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);

  const userType = subheading.startsWith("Student")
    ? "student"
    : subheading.startsWith("Admin")
    ? "admin"
    : "warden";

  useEffect(() => {
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      dispatch({ type: errorCodeRemoveType });
      setError("");
    }, 5000);
  }, [dispatch, errorMessage, errorCodeRemoveType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(action(formData, history));
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    dispatch(linkForPasswordReset(userType, passwordResetEmail));
    setIsEmailSend(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  Modal.setAppElement("#root");

  return (
    <Modal
      style={LoginModalStyle}
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <h2 className="heading">Hostel Management System</h2>
      <h4 className="sub-heading">{subheading}</h4>
      {!forgetPassword ? (
        <form className="login-form" onSubmit={handleSubmit}>
          {error &&
            error.map((err, indx) => (
              <div key={indx} className="error-message">
                {err.msg}
              </div>
            ))}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="eg: arnabkundu@gmail.com"
            onChange={handleChange}
            required
          />
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="password"
            id="pwd"
            onChange={handleChange}
            required
          />
          <button type="submit" className="log-btn">
            LOGIN
          </button>
          <p
            onClick={() => setForgetPassword(true)}
            className="forget-password"
          >
            Forget Password
          </p>
        </form>
      ) : (
        <form className="password-reset-form" onSubmit={handlePasswordReset}>
          {!isEmailSend ? (
            <>
              <h5 className="password-reset-heading">
                Enter email for password reset link
              </h5>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="eg: arnabkundu@gmail.com"
                onChange={(e) =>
                  setPasswordResetEmail({
                    ...passwordResetEmail,
                    email: e.target.value,
                  })
                }
                required
              />
              <button type="submit" className="pass-reset-btn">
                SEND LINK
              </button>
            </>
          ) : (
            <p className="password-reset-email-sent">{`Link for password reset has been sent to ${passwordResetEmail.email}`}</p>
          )}

          <p
            className="back-to-login"
            onClick={() => {
              setForgetPassword(false);
              setIsEmailSend(false);
            }}
          >
            Back to Login
          </p>
        </form>
      )}
    </Modal>
  );
};

export default LoginModal;
