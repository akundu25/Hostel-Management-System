import * as api from "../api/api.js";

export const getRooms = (year) => async (dispatch) => {
  try {
    const { data } = await api.fetchRooms(year);

    dispatch({ type: "FETCH_ROOMS", payload: { data, year } });
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = (roomId, student, year) => async (dispatch) => {
  try {
    const { data } = await api.addOccupant(roomId, student);

    dispatch({ type: "ADD_OCCUPANT", payload: { data, year } });
  } catch (error) {
    dispatch({ type: "ROOMS_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const deleteStudent = (studentId, roomId, year) => async (dispatch) => {
  try {
    const { data } = await api.deleteOccupant(studentId, roomId);

    dispatch({ type: "DELETE_OCCUPANT", payload: { data, year } });
  } catch (error) {
    dispatch({ type: "ROOMS_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const fetchStudents = (year) => async (dispatch) => {
  try {
    const { data } = await api.getStudents(year);

    dispatch({ type: "FETCH_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
