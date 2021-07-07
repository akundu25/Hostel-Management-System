const warden = (
  state = {
    authData: null,
    error: null,
    students: null,
    rooms: null,
    unallocatedStudents: null,
    availableRooms: null,
    grievances: null,
    notices: null,
    profile: null,
  },
  action
) => {
  switch (action.type) {
    case "WARDEN_AUTH":
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ ...action?.payload })
      );
      localStorage.setItem("userType", "warden");
      return { ...state, authData: action?.payload };
    case "WARDEN_AUTH_ERROR":
      return { ...state, error: action?.payload };
    case "WARDEN_AUTH_ERROR_REMOVE":
      return { ...state, error: null };
    case "FETCH_STUDENTS":
      return { ...state, students: action?.payload };
    case "FETCH_WARDEN_ROOMS":
      return { ...state, rooms: action?.payload };
    case "DELETE_ROOM_OCCUPANT":
    case "ADD_ROOM_OCCUPANT":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action?.payload._id ? action?.payload : room
        ),
      };
    case "ADD_OCCUPANT_ERROR":
      return {
        ...state,
        error: action?.payload,
      };
    case "ADD_OCCUPANT_ERROR_REMOVE":
      return {
        ...state,
        error: null,
      };
    case "FETCH_STUDENT_GRIEVANCES":
      return { ...state, grievances: action?.payload };
    case "CHANGE_GRIEVANCE_STATUS":
      return {
        ...state,
        grievances: state.grievances.map((grievance) =>
          grievance._id === action?.payload?._id ? action?.payload : grievance
        ),
      };
    case "DELETE_GRIEVANCE":
      return {
        ...state,
        grievances: state.grievances.filter(
          (grievance) => grievance._id !== action?.payload
        ),
      };
    case "SEND_NOTICES":
      if (state.notices) {
        state.notices.push(action?.payload);
        return state;
      } else return { ...state, notices: [action?.payload] };
    case "FETCH_WARDEN_NOTICES":
      return { ...state, notices: action?.payload };
    case "DELETE_WARDEN_NOTICE":
      return {
        ...state,
        notices: state.notices.filter(
          (notice) => notice._id !== action?.payload
        ),
      };
    case "FETCH_WARDEN_PROFILE":
    case "UPDATE_WARDEN_PROFILE":
      return { ...state, profile: action?.payload };
    case "FETCH_UNALLOCATED_STUDENTS":
      return { ...state, unallocatedStudents: action?.payload };
    case "ADD_UNALLOCATED_STUDENT":
    case "CANCLE_APPLICATION":
      return {
        ...state,
        unallocatedStudents: state.unallocatedStudents.filter(
          (student) => student._id !== action?.payload._id
        ),
      };
    case "FETCH_AVAILABLE_ROOMS":
      return { ...state, availableRooms: action?.payload };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        error: null,
        students: null,
        rooms: null,
        unallocatedStudents: null,
        availableRooms: null,
        grievances: null,
        notices: null,
        profile: null,
      };
    default:
      return state;
  }
};

export default warden;
