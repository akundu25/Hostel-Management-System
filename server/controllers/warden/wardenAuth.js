import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import wardenProfile from "../../models/wardenProfile.js";

export const wardenSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingWarden = await wardenProfile.findOne({ email });

    if (!existingWarden)
      return res.status(404).json({ errors: [{ msg: "Invalid credentials" }] });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingWarden.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ errors: [{ msg: "Incorrect password" }] });

    const token = jwt.sign(
      { email, id: existingWarden._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const localProfile = {
      name: existingWarden.name,
      year: existingWarden.year,
    };

    res.status(200).json({ localProfile, token });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
