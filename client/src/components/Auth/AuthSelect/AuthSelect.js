import React, { useState } from "react";
import AuthStudnet from "../AuthStudent/AuthStudent.js";
import AuthWarden from "../AuthWarden/AuthWarden.js";
import AuthAdmin from "../AuthAdmin/AuthAdmin.js";
import "./AuthSelect.css";

const AuthSelect = () => {
  const [showModalForStudent, setShowModalForStudent] = useState(false);
  const [showModalForWarden, setShowModalForWarden] = useState(false);
  const [showModalForAdmin, setShowModalForAdmin] = useState(false);

  const handleClickForStudentModal = () => setShowModalForStudent(true);
  const handleClickForWardenModal = () => setShowModalForWarden(true);
  const handleClickForAdminModal = () => setShowModalForAdmin(true);

  return (
    <div className="container">
      <div className="inner-container">
        <button className="login-btn" onClick={handleClickForStudentModal}>
          Student Login
        </button>
        <AuthStudnet
          showModal={showModalForStudent}
          setShowModal={setShowModalForStudent}
        />
        <button className="login-btn" onClick={handleClickForWardenModal}>
          Warden Login
        </button>
        <AuthWarden
          showModal={showModalForWarden}
          setShowModal={setShowModalForWarden}
        />
        <button className="login-btn" onClick={handleClickForAdminModal}>
          Admin Login
        </button>
        <AuthAdmin
          showModal={showModalForAdmin}
          setShowModal={setShowModalForAdmin}
        />
      </div>
    </div>
  );
};

export default AuthSelect;
