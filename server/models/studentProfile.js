import mongoose from "mongoose";

const studentProfileSchema = mongoose.Schema({
  name: String,
  roll: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: Number,
  parent_name: String,
  parent_email: String,
  parent_mobile_number: Number,
  semester: Number,
  year: { type: Number, required: true },
  stream: String,
  room_number: String,
  selectedFile: String,
  password: String,
  application_status: {
    type: String,
    default: "Pending",
  },
});

const studentProfile = mongoose.model("studentProfile", studentProfileSchema);

export default studentProfile;
