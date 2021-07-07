import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { AddOccupantModalStyle } from "./AddOccupantModalStyle.js";

import "./AddOccupantModal.css";

Modal.setAppElement("#root");

const AddOccupantModal = ({
  showModal,
  setShowModal,
  students,
  roomId,
  year,
  addStudentAction,
}) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const dispatch = useDispatch();

  const handleAddOccupant = (e) => {
    e.preventDefault();
    dispatch(addStudentAction(roomId, selectedStudent, year));
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={AddOccupantModalStyle}
    >
      <h2 className="add-occupant-modal-heading">
        Allocate this room to a student
      </h2>
      <form className="add-occupant-form">
        <label htmlFor="student-list">Students List:</label>
        <select
          id="student-list"
          className="student-selector"
          onChange={(e) => setSelectedStudent(JSON.parse(e.target.value))}
        >
          <option value={"{}"}>Select Student</option>
          {students &&
            students.map((student, indx) => (
              <option key={indx} value={JSON.stringify(student)}>
                {student.name}
              </option>
            ))}
        </select>
        <button
          className="add-occupant-modal-btn"
          type="button"
          onClick={handleAddOccupant}
        >
          Allocate room to {selectedStudent.name}
        </button>
      </form>
    </Modal>
  );
};

export default AddOccupantModal;
