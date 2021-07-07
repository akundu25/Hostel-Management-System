import jwt, { decode } from "jsonwebtoken";
import wardenProfile from "../models/wardenProfile.js";

const WardenAuth = async (req, res, next) => {
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

    const wardenUser = await wardenProfile.findById(
      decodedData && decodedData.id
    );

    if (!wardenUser)
      return res
        .status(404)
        .json({ errors: [{ msg: "Warden not found with this id" }] });

    req.userId = wardenUser._id;
    req.year = wardenUser.year;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: [{ msg: "Not authorized to access this route" }] });
  }
};

export default WardenAuth;
