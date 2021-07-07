import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import studentProfile from "../../models/studentProfile.js";
import adminProfile from "../../models/adminProfile.js";
import wardenProfile from "../../models/wardenProfile.js";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "hostelmanagementsystem2021@outlook.com",
    pass: "HostelManagementSystem@2021",
  },
});

export const sendLinkForPasswordReset = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { userType } = req.params;
  const { email } = req.body;

  const userProfile =
    userType === "student"
      ? studentProfile
      : userType === "admin"
      ? adminProfile
      : wardenProfile;

  try {
    const profile = await userProfile.findOne({ email });

    if (!profile)
      return res
        .status(404)
        .json({ errors: [{ msg: `${userType} not found with this email` }] });

    const resetPasswordSecret =
      process.env.JWT_PASSWORD_SECRET + profile.password;

    const token = jwt.sign({ email, id: profile._id }, resetPasswordSecret, {
      expiresIn: process.env.JWT_PASSWORD_EXPIRE,
    });

    const link = `http://localhost:3000/reset-password`;

    const options = {
      from: "hostelmanagementsystem2021@outlook.com",
      to: email,
      subject: "Reset password",
      html: `<><p>The below will expire in 15 minutes</p><a href=${link}>Link to change your password</a></>`,
    };

    await transporter.sendMail(options);

    res.status(200).json({ token, id: profile._id });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const resetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { userType, token, id } = req.params;
  const { password, confirmPassword } = req.body;

  const userProfile =
    userType === "student"
      ? studentProfile
      : userType === "admin"
      ? adminProfile
      : wardenProfile;

  try {
    const profile = await userProfile.findById(id);

    if (!profile)
      return res.status(404).json({ errors: [{ msg: "Invalid id!" }] });

    const secret = process.env.JWT_PASSWORD_SECRET + profile.password;

    const decodedToken = jwt.verify(token, secret);

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });

    const hashedPassword = await bcrypt.hash(password, 12);

    await userProfile.findByIdAndUpdate(id, {
      $set: { password: hashedPassword },
    });

    res.status(200).json({ message: "Reset password completed" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
