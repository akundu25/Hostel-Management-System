import * as api from "../api/api.js";

export const adminSignup = (adminProfile, history) => async (dispatch) => {
  try {
    const { data } = await api.signupAdmin(adminProfile);

    dispatch({ type: "ADMIN_AUTH", payload: data });
    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const adminSignin = (admin, history) => async (dispatch) => {
  try {
    const { data } = await api.signinAdmin(admin);

    dispatch({ type: "ADMIN_AUTH", payload: data });
    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const fetchFirstYearStudents = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.getFirstYearStudents(page, limit);

    dispatch({ type: "FETCH_FIRST_YEAR_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSecondYearStudents = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.getSecondYearStudents(page, limit);

    dispatch({ type: "FETCH_SECOND_YEAR_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchThirdYearStudents = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.getThirdYearStudents(page, limit);

    dispatch({ type: "FETCH_THIRD_YEAR_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFourthYearStudents = (page, limit) => async (dispatch) => {
  try {
    const { data } = await api.getFourthYearStudents(page, limit);

    dispatch({ type: "FETCH_FOURTH_YEAR_STUDENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getWardens = (year) => async (dispatch) => {
  try {
    const { data } = await api.fetchWardens(year);

    dispatch({ type: "FETCH_WARDENS", payload: data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const deleteWarden = (wardenId) => async (dispatch) => {
  try {
    await api.removeWarden(wardenId);

    dispatch({ type: "DELETE_WARDEN", payload: wardenId });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const wardenSignup = (wardenProfile) => async (dispatch) => {
  try {
    const { data } = await api.signupWarden(wardenProfile);

    dispatch({ type: "WARDEN_SIGNUP", payload: data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response });
    console.log(error.response);
  }
};

export const fetchAdminProfile = () => async (dispatch) => {
  try {
    const { data } = await api.getAdminProfile();

    dispatch({ type: "FETCH_ADMIN_PROFILE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const adminProfileUpdate = (profile) => async (dispatch) => {
  try {
    const { data } = await api.updateAdminProfile(profile);

    dispatch({ type: "UPDATE_ADMIN_PROFILE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
