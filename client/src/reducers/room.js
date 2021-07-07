const room = (
  state = {
    firstYearRooms: null,
    secondYearRooms: null,
    thirdYearRooms: null,
    fourthYearRooms: null,
    students: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_ROOMS":
      const year = action.payload.year;
      if (year === 1) return { ...state, firstYearRooms: action.payload.data };
      else if (year === 2)
        return { ...state, secondYearRooms: action.payload.data };
      else if (year === 3)
        return { ...state, thirdYearRooms: action.payload.data };
      else if (year === 4)
        return { ...state, fourthYearRooms: action.payload.data };
      else return state;
    case "ADD_OCCUPANT":
    case "DELETE_OCCUPANT":
      const yr = action.payload.year;
      if (yr === 1)
        return {
          ...state,
          firstYearRooms: state.firstYearRooms.map((room) =>
            room._id === action.payload.data._id ? action.payload.data : room
          ),
        };
      else if (yr === 2)
        return {
          ...state,
          secondYearRooms: state.secondYearRooms.map((room) =>
            room._id === action.payload.data._id ? action.payload.data : room
          ),
        };
      else if (yr === 3)
        return {
          ...state,
          thirdYearRooms: state.thirdYearRooms.map((room) =>
            room._id === action.payload.data._id ? action.payload.data : room
          ),
        };
      else if (yr === 4)
        return {
          ...state,
          fourthYearRooms: state.fourthYearRooms.map((room) =>
            room._id === action.payload.data._id ? action.payload.data : room
          ),
        };
      else return state;
    case "ROOMS_ERROR":
      return { ...state, error: action?.payload };
    case "REMOVE_ROOMS_ERROR":
      return { ...state, error: null };
    case "FETCH_STUDENTS":
      return {
        ...state,
        students: action?.payload,
      };
    default:
      return state;
  }
};

export default room;
