import express from "express";
import { wardenSignin } from "../controllers/warden/wardenAuth.js";
import {
  getStudents,
  fetchStudentGrievances,
  changeGrievanceStatus,
  deleteGrievance,
  wardenNotices,
  viewWardenNotices,
  deleteWardenNotice,
  getWardenProfile,
  updateWardenProfile,
  getUnallocatedStudents,
  getAvailableRooms,
  cancelApplication,
} from "../controllers/warden/warden.js";
import PaginatedResults from "../middlewares/PaginatedResults.js";
import studentProfile from "../models/studentProfile.js";
import WardenAuth from "../middlewares/WardenAuth.js";

const router = express.Router();

router.post("/signin", wardenSignin);
router.get(
  "/students",
  WardenAuth,
  PaginatedResults(studentProfile),
  getStudents
);
router.get("/student-grievances", WardenAuth, fetchStudentGrievances);
router.patch(
  "/change-grievance-status/:grievanceId",
  WardenAuth,
  changeGrievanceStatus
);
router.delete("/delete-grievance/:grievanceId", deleteGrievance);
router.post("/warden-notices", WardenAuth, wardenNotices);
router.get("/view-warden-notices", WardenAuth, viewWardenNotices);
router.delete(
  "/delete-warden-notice/:noticeId",
  WardenAuth,
  deleteWardenNotice
);
router.get("/warden-profile", WardenAuth, getWardenProfile);
router.patch("/update-warden-profile", WardenAuth, updateWardenProfile);
router.get("/unallocated-students/:year", WardenAuth, getUnallocatedStudents);
router.get("/available-rooms/:year", WardenAuth, getAvailableRooms);
router.patch("/cancel-application/:studentId", WardenAuth, cancelApplication);

export default router;
