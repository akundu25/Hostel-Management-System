import express from "express";
import { check } from "express-validator";
import {
  fetchStudent,
  updateStudentProfile,
  reportGrievance,
  fetchGrievances,
  getWardenNotices,
  applyAgain,
} from "../controllers/students/student.js";
import {
  registerStudent,
  signinStudent,
} from "../controllers/students/studentAuth.js";
import StudentAuth from "../middlewares/StudentAuth.js";

const router = express.Router();

router.get("/student-profile", StudentAuth, fetchStudent);
router.patch("/student-profile-update", StudentAuth, updateStudentProfile);
router.post("/report-grievance", StudentAuth, reportGrievance);
router.get("/student-grievances", StudentAuth, fetchGrievances);
router.get("/warden-notices", StudentAuth, getWardenNotices);
router.patch("/apply-again/:studentId", StudentAuth, applyAgain);

router.post(
  "/register",
  check("email").isEmail().withMessage("The email id is invalid"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "The password should contain atleast 8 and atmost 20 characters"
    )
    .matches("^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$", "i")
    .withMessage(
      "The password should contain atleast one number and one special character"
    ),
  check("parent_email")
    .isEmail()
    .withMessage("The email id of parent is invalid"),
  registerStudent
);
router.post("/signin", signinStudent);

export default router;
