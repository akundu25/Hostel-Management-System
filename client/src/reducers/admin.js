const admin = (
  state = {
    authData: null,
    firstYearStudents: null,
    secondYearStudents: null,
    thirdYearStudents: null,
    fourthYearStudents: null,
    wardenOneData: null,
    wardenTwoData: null,
    error: null,
    profile: null,
  },
  action
) => {
  switch (action.type) {
    case "ADMIN_AUTH":
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ ...action?.payload })
      );
      localStorage.setItem("userType", "admin");
      return { ...state, authData: action?.payload };
    case "ERROR":
      return {
        ...state,
        error: action?.payload,
        wardenOneData: null,
        wardenTwoData: null,
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        error: null,
      };
    case "FETCH_FIRST_YEAR_STUDENTS":
      return { ...state, firstYearStudents: action?.payload };
    case "FETCH_SECOND_YEAR_STUDENTS":
      return { ...state, secondYearStudents: action?.payload };
    case "FETCH_THIRD_YEAR_STUDENTS":
      return { ...state, thirdYearStudents: action?.payload };
    case "FETCH_FOURTH_YEAR_STUDENTS":
      return { ...state, fourthYearStudents: action?.payload };
    case "FETCH_WARDENS":
      return {
        ...state,
        wardenOneData: action?.payload[0],
        wardenTwoData: action?.payload[1],
      };
    case "DELETE_WARDEN":
      return {
        ...state,
        wardenOneData:
          state.wardenOneData?._id === action?.payload
            ? null
            : state.wardenOneData,
        wardenTwoData:
          state.wardenTwoData?._id === action?.payload
            ? null
            : state.wardenTwoData,
      };
    case "WARDEN_SIGNUP":
      return {
        ...state,
        wardenOneData: state.wardenOneData || action?.payload,
        wardenTwoData: state.wardenOneData && action?.payload,
      };
    case "FETCH_ADMIN_PROFILE":
    case "UPDATE_ADMIN_PROFILE":
      return { ...state, profile: action?.payload };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        firstYearStudents: null,
        secondYearStudents: null,
        thirdYearStudents: null,
        fourthYearStudents: null,
        wardenOneData: null,
        wardenTwoData: null,
        error: null,
        profile: null,
      };
    default:
      return state;
  }
};

export default admin;
