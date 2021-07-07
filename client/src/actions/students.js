import * as api from "../api/api.js";

export const getStudents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getStudent();

    dispatch({ type: "FETCH_STUDENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const studentProfileUpdate = (profile) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(profile);

    dispatch({ type: "UPDATE_STUDENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const grievanceReport = (grievance) => async () => {
  try {
    await api.reportGrievance(grievance);
  } catch (error) {
    console.log(error);
  }
};

export const fetchGrievances = () => async (dispatch) => {
  try {
    const { data } = await api.getGrievances();

    dispatch({ type: "FETCH_GRIEVANCES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const registerStudent = (student, history) => async (dispatch) => {
  try {
    const { data } = await api.postStudent(student);

    dispatch({ type: "STUDENT_AUTH", payload: data });
    history.push("/student-dashboard");
  } catch (error) {
    dispatch({ type: "STUDENT_AUTH_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const studentSignin = (student, history) => async (dispatch) => {
  try {
    const { data } = await api.signinStudent(student);

    dispatch({ type: "STUDENT_AUTH", payload: data });
    history.push("/student-dashboard");
  } catch (error) {
    dispatch({ type: "STUDENT_AUTH_ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const fetchWardenNotices = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenNotices();

    dispatch({ type: "GET_WARDEN_NOTICES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const applyOnceMore = (studentId) => async (dispatch) => {
  try {
    const { data } = api.applyAgain(studentId);

    dispatch({ type: "APPLY_AGAIN", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};
