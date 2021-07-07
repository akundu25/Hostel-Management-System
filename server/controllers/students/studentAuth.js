import studentProfile from "../../models/studentProfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const registerStudent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const profile = req.body;
  const { password, confirmPassword, email, selectedFile, name } = profile;

  try {
    const existingStudent = await studentProfile.findOne({ email });

    if (existingStudent)
      return res
        .status(400)
        .json({ errors: [{ msg: "Student already exists." }] });

    if (password !== confirmPassword)
      return res.status(400).json({ errors: [{ msg: "Wrong credentials." }] });

    const hashedPassword = await bcrypt.hash(password, 12);

    delete profile.confirmPassword;

    if (selectedFile === "/static/media/profile.9aa24e7e.jpg")
      profile.selectedFile = "";

    if (profile.semester < 1 && profile.semester > 8)
      return res
        .status(400)
        .json({ errors: [{ msg: "The semester value is invalid" }] });
    else if (profile.semester <= 2) profile.year = 1;
    else if (profile.semester <= 4) profile.year = 2;
    else if (profile.semester <= 6) profile.year = 3;
    else if (profile.semester <= 8) profile.year = 4;

    const newStudentProfile = await studentProfile.create({
      ...profile,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newStudentProfile.email, id: newStudentProfile._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const localProfile =
      selectedFile === "/static/media/profile.9aa24e7e.jpg"
        ? { name, selectedFile: "" }
        : { name, selectedFile };
    res.status(200).json({ localProfile, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const signinStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingStudent = await studentProfile.findOne({ email });

    if (!existingStudent)
      return res.status(404).json({ errors: [{ msg: "Student not found." }] });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });

    const token = jwt.sign(
      { email: existingStudent.email, id: existingStudent._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const { name, selectedFile } = existingStudent;
    const localProfile =
      selectedFile === "/static/media/profile.9aa24e7e.jpg"
        ? { name, selectedFile: "" }
        : { name, selectedFile };

    res.status(200).json({ localProfile, token });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
