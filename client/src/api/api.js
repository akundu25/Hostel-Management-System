import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile")).token
    }`;
  }

  return req;
});

//Students API calls

export const fetchStudents = () => API.get("/students");
export const getStudent = () => API.get("/students/student-profile");
export const updateStudent = (profile) =>
  API.patch("/students/student-profile-update", profile);
export const reportGrievance = (grievance) =>
  API.post("/students/report-grievance", grievance);
export const getGrievances = () => API.get("/students/student-grievances");
export const getWardenNotices = () => API.get("/students/warden-notices");
export const applyAgain = (studentId) =>
  API.patch(`/students/apply-again/${studentId}`);

export const postStudent = (student) => API.post("/students/register", student);
export const signinStudent = (student) => API.post("/students/signin", student);

//Admin API calls

export const signupAdmin = (admin) => API.post("/admin/signup", admin);
export const signinAdmin = (admin) => API.post("/admin/signin", admin);

export const getFirstYearStudents = (page, limit) =>
  API.get(`/admin/first-year-students?page=${page}&limit=${limit}`);
export const getSecondYearStudents = (page, limit) =>
  API.get(`/admin/second-year-students?page=${page}&limit=${limit}`);
export const getThirdYearStudents = (page, limit) =>
  API.get(`/admin/third-year-students?page=${page}&limit=${limit}`);
export const getFourthYearStudents = (page, limit) =>
  API.get(`/admin/fourth-year-students?page=${page}&limit=${limit}`);
export const signupWarden = (warden) => API.post("/admin/wardenSignup", warden);
export const fetchWardens = (year) => API.get(`/admin/${year}`);
export const removeWarden = (wardenId) => API.delete(`/admin/${wardenId}`);
export const getAdminProfile = () => API.get("/admin/admin-profile");
export const updateAdminProfile = (profile) =>
  API.patch("/admin/update-admin-profile", profile);

//Warden API calls

export const signinWarden = (warden) => API.post("/warden/signin", warden);
export const getWardenStudents = (page, limit) =>
  API.get(`/warden/students?page=${page}&limit=${limit}`);
export const getWardenRooms = (year) => API.get(`/room/${year}`);
export const deleteWardenRoomOccupant = (studentId, roomId) =>
  API.patch(`/room/delete-occupant/${studentId}/${roomId}`);
export const addRoomOccupant = (roomId, student) =>
  API.patch(`/room/add-occupant/${roomId}`, student);
export const fetchStudentGrievances = () =>
  API.get("/warden/student-grievances");
export const changeGrievanceStatus = (grievanceId) =>
  API.patch(`/warden/change-grievance-status/${grievanceId}`);
export const deleteGrievance = (grievanceId) =>
  API.delete(`/warden/delete-grievance/${grievanceId}`);
export const wardenNotices = (notice) =>
  API.post("/warden/warden-notices", notice);
export const viewWardenNotices = () => API.get("/warden/view-warden-notices");
export const deleteWardenNotice = (noticeId) =>
  API.delete(`/warden/delete-warden-notice/${noticeId}`);
export const getWardenProfile = () => API.get("/warden/warden-profile");
export const updateWardenProfile = (profile) =>
  API.patch("/warden/update-warden-profile", profile);
export const getUnallocatedStudents = (year) =>
  API.get(`/warden/unallocated-students/${year}`);
export const getAvailableRooms = (year) =>
  API.get(`/warden/available-rooms/${year}`);
export const cancleApplication = (studentId, appStatus) =>
  API.patch(`/warden/cancel-application/${studentId}`, appStatus);

//Rooms API calls

export const fetchRooms = (year) => API.get(`/room/${year}`);
export const addOccupant = (roomId, student) =>
  API.patch(`/room/add-occupant/${roomId}`, student);
export const deleteOccupant = (studentId, roomId) =>
  API.patch(`/room/delete-occupant/${studentId}/${roomId}`);
export const getStudents = (year) => API.get(`/room/students/${year}`);

//Reset password API calls

export const sendLinkForPasswordReset = (userType, passResetMail) =>
  API.post(`/reset-password-mail/${userType}`, passResetMail);
export const resetPassword = (userType, id, token, newPassword) =>
  API.post(`/reset-password/${userType}/${id}/${token}`, newPassword);
