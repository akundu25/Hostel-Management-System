import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { CancelApplicationModalStyle } from "./CancelApplicationModalStyle.js";
import { rejectApplication } from "../../actions/warden.js";

const CancelApplicationModal = ({ showModal, setShowModal, student }) => {
  const dispatch = useDispatch();
  const [appStatus, setAppStatus] = useState({ status: "" });

  const handleCancelApplication = (e) => {
    e.preventDefault();
    dispatch(rejectApplication(student, appStatus));
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={CancelApplicationModalStyle}
    >
      <h2 className="add-occupant-modal-heading">Reasons for cancellation</h2>
      <form className="add-occupant-form">
        <textarea
          name="status"
          rows={5}
          cols={50}
          value={appStatus.status}
          onChange={(e) => setAppStatus({ status: e.target.value })}
        />
        <button
          className="add-occupant-modal-btn"
          type="button"
          onClick={handleCancelApplication}
        >
          Cancel Application of {student.name}
        </button>
      </form>
    </Modal>
  );
};

export default CancelApplicationModal;
