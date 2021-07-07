import { combineReducers } from "redux";
import students from "./students.js";
import admin from "./admin.js";
import warden from "./warden.js";
import room from "./room.js";
import resetPassword from "./resetPassword.js";

export default combineReducers({
  students,
  admin,
  warden,
  room,
  resetPassword,
});
