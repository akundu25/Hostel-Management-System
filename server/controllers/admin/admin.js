import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import wardenProfile from "../../models/wardenProfile.js";
import adminProfile from "../../models/adminProfile.js";

export const getFirstYearStudents = async (req, res) => {
  res.status(200).json(res.paginatedResults);
};

export const getSecondYearStudents = async (req, res) => {
  res.status(200).json(res.paginatedResults);
};

export const getThirdYearStudents = async (req, res) => {
  res.status(200).json(res.paginatedResults);
};

export const getFourthYearStudents = async (req, res) => {
  res.status(200).json(res.paginatedResults);
};

export const wardenSignup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const profile = req.body;
  const { email, password, confirmPassword } = profile;

  try {
    const existingWarden = await wardenProfile.findOne({ email });

    if (existingWarden)
      return res
        .status(404)
        .json({ errors: [{ msg: "Warden already exists" }] });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });

    const hashedPassword = await bcrypt.hash(password, 12);

    delete profile.confirmPassword;

    const newWarden = await wardenProfile.create({
      ...profile,
      password: hashedPassword,
    });

    const resWarden = {
      name: newWarden.name,
      email: newWarden.email,
      mobile: newWarden.mobile,
      designation: newWarden.designation,
      year: newWarden.year,
      _id: newWarden._id,
    };

    res.status(201).json(resWarden);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const fetchWardens = async (req, res) => {
  const { year } = req.params;

  try {
    const wardens = await wardenProfile.find({ year: year }, { password: 0 });

    if (!wardens.length)
      return res
        .status(404)
        .json({ errors: [{ msg: "No wardens assigned yet" }] });

    res.status(200).json(wardens);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const removeWarden = async (req, res) => {
  const { wardenId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(wardenId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No warden exists with this id" }] });

  try {
    await wardenProfile.findByIdAndDelete(wardenId);
    res.json({ message: "The warden has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getAdminProfile = async (req, res) => {
  const adminId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(adminId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No admin exists with this id" }] });

  try {
    const profile = await adminProfile.findById(adminId, { password: 0 });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const updateAdminProfile = async (req, res) => {
  const adminId = req.userId;
  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(adminId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No admin exists with this id" }] });

  try {
    const updatedProfile = await adminProfile.findByIdAndUpdate(
      adminId,
      profile,
      { new: true, fields: { password: 0 } }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
