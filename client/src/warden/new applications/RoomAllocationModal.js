import React, { useState } from "react";
import { RoomAllocationModalStyle } from "./RoomAllocationModalStyle.js";
import { addUnallocatedStudent } from "../../actions/warden";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

const RoomAllocationModal = ({ showModal, setShowModal, student, rooms }) => {
  const dispatch = useDispatch();
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleAllocateRoom = (e) => {
    e.preventDefault();
    dispatch(addUnallocatedStudent(selectedRoom._id, student));
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={RoomAllocationModalStyle}
    >
      <h2 className="add-occupant-modal-heading">
        Allocate room to {student.name}
      </h2>
      <form className="add-occupant-form">
        <label htmlFor="student-list">Rooms List:</label>
        <select
          id="student-list"
          className="student-selector"
          onChange={(e) => setSelectedRoom(JSON.parse(e.target.value))}
        >
          <option value={"{}"}>Select Room</option>
          {rooms &&
            rooms.map((room, indx) => (
              <option key={indx} value={JSON.stringify(room)}>
                {room.room_number}
              </option>
            ))}
        </select>
        <button
          className="add-occupant-modal-btn"
          type="button"
          onClick={handleAllocateRoom}
        >
          Allocate room {selectedRoom.room_number} to {student.name}
        </button>
      </form>
    </Modal>
  );
};

export default RoomAllocationModal;
