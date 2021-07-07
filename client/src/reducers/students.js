const students = (
  state = {
    authData: null,
    profile: null,
    grievances: [],
    error: null,
    notices: null,
  },
  action
) => {
  switch (action.type) {
    case "STUDENT_AUTH":
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ ...action?.payload })
      );
      localStorage.setItem("userType", "student");
      return { ...state, authData: action?.payload };
    case "STUDENT_AUTH_ERROR":
      return { ...state, error: action?.payload };
    case "STUDENT_AUTH_ERROR_REMOVE":
      return { ...state, error: null };
    case "FETCH_STUDENT":
    case "UPDATE_STUDENT":
    case "APPLY_AGAIN":
      return { ...state, profile: action?.payload };
    case "FETCH_GRIEVANCES":
      return { ...state, grievances: action?.payload };
    case "GET_WARDEN_NOTICES":
      return {
        ...state,
        notices: action?.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        profile: null,
        grievances: [],
        error: null,
        notices: null,
      };
    default:
      return state;
  }
};

export default students;
