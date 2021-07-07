import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../actions/room.js";
import LoadingScreen from "../widgets/Loading screen/LoadingScreen.js";
import RoomsTable from "./RoomsTable.js";

import "./Rooms.css";

const FourthYearRooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.fourthYearRooms);
  const errorMessage = useSelector((state) => state.room.error);
  const [fourthYearRooms, setFourthYearRooms] = useState(rooms);
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    !rooms && dispatch(getRooms(4));
    setFourthYearRooms(rooms);
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      errorMessage && setError(null);
      dispatch({ type: "REMOVE_ROOMS_ERROR" });
    }, 2000);
  }, [dispatch, rooms, errorMessage]);

  return (
    <div className="main-room-container">
      <div className="inner-room-container">
        {error &&
          error.map((err, indx) => (
            <div key={indx} className="rooms-error-message">
              {err.msg}
            </div>
          ))}
        {fourthYearRooms ? (
          fourthYearRooms.length ? (
            <RoomsTable rooms={fourthYearRooms} year={4} />
          ) : (
            <span className="no-rooms-available">No Rooms available!</span>
          )
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default FourthYearRooms;
