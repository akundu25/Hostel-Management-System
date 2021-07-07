import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import adminProfile from "../models/adminProfile.js";

const AdminAuth = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

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

    const adminUser = await adminProfile.findById(
      decodedData && decodedData.id
    );

    if (!adminUser)
      return res
        .status(404)
        .json({ errors: [{ msg: "Admin not found with this id" }] });

    req.userId = adminUser._id;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: [{ msg: "Not authorized to access this route" }] });
  }
};

export default AdminAuth;
