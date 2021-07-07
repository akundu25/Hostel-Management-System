import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import adminProfile from "../../models/adminProfile.js";

export const signupAdmin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingAdmin = await adminProfile.findOne({ email });

    if (existingAdmin)
      return res
        .status(404)
        .json({ errors: [{ msg: "Admin already exists." }] });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await adminProfile.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email, id: newAdmin._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    const localProfile = { name };

    res.status(201).json({ localProfile, token });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const signinAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await adminProfile.findOne({ email });

    if (!existingAdmin)
      return res
        .status(404)
        .json({ errors: [{ msg: "Admin doesn't exists." }] });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect)
      return res.status(400).send({ errors: [{ msg: "Password incorrect!" }] });

    const token = jwt.sign(
      { email, id: existingAdmin._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    const { name } = existingAdmin;
    const localProfile = { name };

    res.status(200).json({ localProfile, token });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
