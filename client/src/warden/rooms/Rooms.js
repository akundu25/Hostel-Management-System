import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../actions/warden.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";
import WardenRoomsTable from "./WardenRoomsTable.js";

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.warden.rooms);
  const errorMessage = useSelector((state) => state.warden.error);
  const [wardenRooms, setWardenRooms] = useState(rooms);
  const [error, setError] = useState(errorMessage);
  const { year } = JSON.parse(localStorage.getItem("userProfile")).localProfile;

  useEffect(() => {
    !rooms && dispatch(fetchRooms(year));
    setWardenRooms(rooms);
    errorMessage && setError(errorMessage.data.errors);

    setTimeout(() => {
      errorMessage && setError(null);
      dispatch({ type: "ADD_OCCUPANT_ERROR_REMOVE" });
    }, 2000);
  }, [dispatch, rooms, year, errorMessage]);

  return (
    <div className="main-room-container">
      <div className="inner-room-container">
        {error &&
          error.map((err, indx) => (
            <div key={indx} className="rooms-error-message">
              {err.msg}
            </div>
          ))}
        {wardenRooms ? (
          wardenRooms.length ? (
            <WardenRoomsTable rooms={wardenRooms} year={year} />
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

export default Rooms;
