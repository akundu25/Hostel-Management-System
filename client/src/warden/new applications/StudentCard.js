import React, { useState } from "react";
import RoomAllocationModal from "./RoomAllocationModal.js";
import { fetchAvailableRooms } from "../../actions/warden.js";
import { useDispatch, useSelector } from "react-redux";
import CancelApplicationModal from "./CancelApplicationModal.js";

const StudentCard = ({ student, year }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCancleAppModal, setShowCancleAppModal] = useState(false);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.warden.availableRooms);

  const handleRoomAllocation = (e) => {
    e.preventDefault();
    setShowModal(true);
    dispatch(fetchAvailableRooms(year));
  };

  return (
    <>
      <div className="new-student-card">
        <div className="new-student-details">
          <div className="new-student-name">Name: {student.name}</div>
          <div className="new-student-email">Email: {student.email}</div>
          <div className="new-student-roll">Roll: {student.roll}</div>
        </div>
        <div className="new-student-room-allotment">
          <span
            className="room-allocate-link"
            onClick={(e) => handleRoomAllocation(e)}
          >
            Allocate room to {student.name}
          </span>
          <span
            className="cancle-application"
            onClick={() => setShowCancleAppModal(true)}
          >
            Cancle application of {student.name}
          </span>
        </div>
      </div>
      <RoomAllocationModal
        showModal={showModal}
        setShowModal={setShowModal}
        student={student}
        rooms={rooms}
      />
      <br />
      <CancelApplicationModal
        showModal={showCancleAppModal}
        setShowModal={setShowCancleAppModal}
        student={student}
      />
    </>
  );
};

export default StudentCard;
