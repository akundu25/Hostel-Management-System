import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal.js";
import { studentSignin } from "../../../actions/students.js";

const AuthStudent = ({ showModal, setShowModal }) => {
  const errorMessage = useSelector((state) => state.students.error);
  return (
    <LoginModal
      showModal={showModal}
      setShowModal={setShowModal}
      subheading="Student Login"
      action={studentSignin}
      errorMessage={errorMessage}
      errorCodeRemoveType="STUDENT_AUTH_ERROR_REMOVE"
    />
  );
};

export default AuthStudent;
