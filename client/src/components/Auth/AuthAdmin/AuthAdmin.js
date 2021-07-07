import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal.js";
import { adminSignin } from "../../../actions/admin.js";

const AuthAdmin = ({ showModal, setShowModal }) => {
  const errorMessage = useSelector((state) => state.admin.error);
  return (
    <LoginModal
      showModal={showModal}
      setShowModal={setShowModal}
      subheading="Admin Login"
      action={adminSignin}
      errorMessage={errorMessage}
      errorCodeRemoveType="REMOVE_ERROR"
    />
  );
};

export default AuthAdmin;
