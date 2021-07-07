import mongoose from "mongoose";

const grievanceSchema = mongoose.Schema({
  name: String,
  roll: String,
  year: {
    type: Number,
    required: true,
  },
  mobile: Number,
  email: String,
  room: String,
  date: {
    type: Date,
    default: new Date(),
  },
  studentId: { type: String, required: true },
  grievance: String,
  status: {
    type: String,
    default: "Active",
  },
});

const grievanceModel = mongoose.model("grievanceModel", grievanceSchema);

export default grievanceModel;
