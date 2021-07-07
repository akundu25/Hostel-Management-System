import express from "express";
import { check } from "express-validator";
import {
  sendLinkForPasswordReset,
  resetPassword,
} from "../controllers/resetPassword/resetPassword.js";

const router = express.Router();

router.post(
  "/reset-password-mail/:userType",
  check("email").isEmail().withMessage("The email id is invalid"),
  sendLinkForPasswordReset
);

router.post(
  "/reset-password/:userType/:id/:token",
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "The password should contain atleast 8 and atmost 20 characters"
    )
    .matches("^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$", "i")
    .withMessage(
      "The password should contain atleast one number and one special character"
    ),
  resetPassword
);

export default router;
