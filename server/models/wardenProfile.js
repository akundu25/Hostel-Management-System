import mongoose from "mongoose";

const wardenSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: Number,
  year: {
    type: Number,
    required: true,
  },
  designation: String,
  password: String,
});

const wardenProfile = mongoose.model("wardenProfile", wardenSchema);

export default wardenProfile;
