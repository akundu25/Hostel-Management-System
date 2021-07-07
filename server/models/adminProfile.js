import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

const adminProfile = mongoose.model("adminProfile", adminSchema);

export default adminProfile;
