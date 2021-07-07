import * as api from "../api/api.js";

export const wardenSignin = (wardenProfile, history) => async (dispatch) => {
  try {
    const { data } = await api.signinWarden(wardenProfile);

    dispatch({ type: "WARDEN_AUTH", payload: data });
    history.push("/warden-dashboard");
  } catch (error) {
    dispatch({ type: "WARDEN_AUTH_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const fetchStudents = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.getWardenStudents(page, limit);

    dispatch({ type: "FETCH_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRooms = (year) => async (dispatch) => {
  try {
    const { data } = await api.getWardenRooms(year);

    dispatch({ type: "FETCH_WARDEN_ROOMS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoomOccupant = (studentId, roomId) => async (dispatch) => {
  try {
    const { data } = await api.deleteWardenRoomOccupant(studentId, roomId);

    dispatch({ type: "DELETE_ROOM_OCCUPANT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addOccupant = (roomId, student) => async (dispatch) => {
  try {
    const { data } = await api.addRoomOccupant(roomId, student);

    dispatch({ type: "ADD_ROOM_OCCUPANT", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_OCCUPANT_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const getStudentGrievances = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudentGrievances();

    dispatch({ type: "FETCH_STUDENT_GRIEVANCES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const grievanceStatusChange = (grievanceId) => async (dispatch) => {
  try {
    const { data } = await api.changeGrievanceStatus(grievanceId);

    dispatch({ type: "CHANGE_GRIEVANCE_STATUS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeGrievance = (grievanceId) => async (dispatch) => {
  try {
    await api.deleteGrievance(grievanceId);

    dispatch({ type: "DELETE_GRIEVANCE", payload: grievanceId });
  } catch (error) {
    console.log(error);
  }
};

export const wardenNoticeMessages = (notice) => async (dispatch) => {
  try {
    const { data } = await api.wardenNotices(notice);

    dispatch({ type: "SEND_NOTICES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const viewNotices = () => async (dispatch) => {
  try {
    const { data } = await api.viewWardenNotices();

    dispatch({ type: "FETCH_WARDEN_NOTICES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeWardenNotice = (noticeId) => async (dispatch) => {
  try {
    await api.deleteWardenNotice(noticeId);

    dispatch({ type: "DELETE_WARDEN_NOTICE", payload: noticeId });
  } catch (error) {
    console.log(error);
  }
};

export const fetchWardenProfile = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenProfile();

    dispatch({ type: "FETCH_WARDEN_PROFILE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (profile) => async (dispatch) => {
  try {
    const { data } = await api.updateWardenProfile(profile);

    dispatch({ type: "UPDATE_WARDEN_PROFILE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUnallocatedStudents = (year) => async (dispatch) => {
  try {
    const { data } = await api.getUnallocatedStudents(year);

    dispatch({ type: "FETCH_UNALLOCATED_STUDENTS", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchAvailableRooms = (year) => async (dispatch) => {
  try {
    const { data } = await api.getAvailableRooms(year);

    dispatch({ type: "FETCH_AVAILABLE_ROOMS", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const addUnallocatedStudent = (roomId, student) => async (dispatch) => {
  try {
    await api.addRoomOccupant(roomId, student);

    dispatch({ type: "ADD_UNALLOCATED_STUDENT", payload: student });
  } catch (error) {
    console.log(error.response);
  }
};

export const rejectApplication = (student, appStatus) => async (dispatch) => {
  try {
    await api.cancleApplication(student._id, appStatus);

    dispatch({ type: "CANCLE_APPLICATION", payload: student });
  } catch (error) {
    console.log(error.response);
  }
};
