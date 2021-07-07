import jwt from "jsonwebtoken";
import studentProfile from "../models/studentProfile.js";

const StudentAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json({ errors: [{ msg: "Not authorized to access this route" }] });

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const studentUser = await studentProfile.findById(
      decodedData && decodedData.id
    );

    if (!studentUser)
      return res
        .status(404)
        .json({ errors: [{ msg: "Student not found with this id" }] });

    req.userId = studentUser._id;
    req.year = studentUser.year;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: [{ msg: "Not authorized to access this route" }] });
  }
};

export default StudentAuth;
