import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal.js";
import { wardenSignin } from "../../../actions/warden.js";

const AuthWarden = ({ showModal, setShowModal }) => {
  const errorMessage = useSelector((state) => state.warden.error);
  return (
    <LoginModal
      showModal={showModal}
      setShowModal={setShowModal}
      subheading="Warden Login"
      action={wardenSignin}
      errorMessage={errorMessage}
      errorCodeRemoveType="WARDEN_AUTH_ERROR_REMOVE"
    />
  );
};

export default AuthWarden;
