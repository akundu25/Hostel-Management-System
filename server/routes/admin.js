import express from "express";
import { check } from "express-validator";
import { signupAdmin, signinAdmin } from "../controllers/admin/adminAuth.js";
import {
  getFirstYearStudents,
  getSecondYearStudents,
  getThirdYearStudents,
  getFourthYearStudents,
  fetchWardens,
  removeWarden,
  getAdminProfile,
  updateAdminProfile,
  wardenSignup,
} from "../controllers/admin/admin.js";
import AdminAuth from "../middlewares/AdminAuth.js";
import PaginatedResults from "../middlewares/PaginatedResults.js";
import studentProfile from "../models/studentProfile.js";

const router = express.Router();

router.get(
  "/first-year-students",
  AdminAuth,
  PaginatedResults(studentProfile, 1),
  getFirstYearStudents
);
router.get(
  "/second-year-students",
  AdminAuth,
  PaginatedResults(studentProfile, 2),
  getSecondYearStudents
);
router.get(
  "/third-year-students",
  AdminAuth,
  PaginatedResults(studentProfile, 3),
  getThirdYearStudents
);
router.get(
  "/fourth-year-students",
  AdminAuth,
  PaginatedResults(studentProfile, 4),
  getFourthYearStudents
);
router.get("/:year", AdminAuth, fetchWardens);
router.delete("/:wardenId", AdminAuth, removeWarden);

router.post(
  "/wardenSignup",
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
  AdminAuth,
  wardenSignup
);
router.get("/admin-profile", AdminAuth, getAdminProfile);
router.patch("/update-admin-profile", AdminAuth, updateAdminProfile);

router.post(
  "/signup",
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
  signupAdmin
);
router.post("/signin", signinAdmin);

export default router;
