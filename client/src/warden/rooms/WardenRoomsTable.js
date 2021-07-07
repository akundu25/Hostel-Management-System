import React, { useState } from "react";
import * as icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoomOccupant,
  fetchUnallocatedStudents,
  addOccupant,
} from "../../actions/warden.js";
import AddOccupantModal from "../../rooms/AddOccupantModal.js";

const columns = ["year", "room_number", "floor", "room_type", "occupants"];

const WardenRoomsTable = ({ rooms, year }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.warden.unallocatedStudents);
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const handleAddOccupant = (e, id) => {
    e.preventDefault();
    setShowModal(true);
    dispatch(fetchUnallocatedStudents(year));
    setRoomId(id);
  };

  return (
    <>
      <table className="rooms-table">
        <thead>
          <tr>
            <th>YEAR</th>
            <th>ROOM NUMBER</th>
            <th>FLOOR</th>
            <th>ROOM TYPE</th>
            <th colSpan={4}>OCCUPANTS</th>
            <th>ADD OCCUPANTS</th>
          </tr>
          {rooms.map((room, indx) => (
            <tr key={indx}>
              {columns.map((col, indx) => {
                if (col === "occupants") {
                  if (room[col].length) {
                    const occupantsArray = room[col].map((occupant, indx) => (
                      <td className="occupant-cell" key={indx}>
                        {occupant.name}
                        <img
                          src={icons.deleteIcon}
                          className="room-occupant-delete-btn"
                          alt="delete"
                          onClick={() =>
                            dispatch(
                              deleteRoomOccupant(room[col][indx]._id, room._id)
                            )
                          }
                        />
                      </td>
                    ));
                    if (room[col].length !== 4) {
                      for (let i = room[col].length; i < 4; i++) {
                        occupantsArray.push(
                          <td className="occupant-cell" key={i}>
                            N/A
                          </td>
                        );
                      }
                    }
                    return occupantsArray;
                  } else {
                    return [
                      <td className="occupant-cell" key={0}>
                        N/A
                      </td>,
                      <td className="occupant-cell" key={1}>
                        N/A
                      </td>,
                      <td className="occupant-cell" key={2}>
                        N/A
                      </td>,
                      <td className="occupant-cell" key={3}>
                        N/A
                      </td>,
                    ];
                  }
                } else {
                  return <td key={indx}>{room[col]}</td>;
                }
              })}
              <td>
                <button
                  className={
                    (room.room_type === "Non Single" &&
                      room.occupants.length === 4) ||
                    (room.room_type === "Single" && room.occupants.length)
                      ? "add-occupant-btn-disabled"
                      : "add-occupant-btn"
                  }
                  disabled={
                    (room.room_type === "Non Single" &&
                      room.occupants.length === 4) ||
                    (room.room_type === "Single" && room.occupants.length)
                      ? true
                      : false
                  }
                  onClick={(e) => handleAddOccupant(e, room._id)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
      <AddOccupantModal
        showModal={showModal}
        setShowModal={setShowModal}
        students={students}
        roomId={roomId}
        year={year}
        addStudentAction={addOccupant}
      />
    </>
  );
};

export default WardenRoomsTable;
