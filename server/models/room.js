import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  year: Number,
  room_number: {
    type: String,
    required: true,
    unique: true,
  },
  floor: String,
  room_type: {
    type: String,
    default: "Non Single",
  },
  bed: Number,
  chair: Number,
  table: Number,
  almirah: Number,
  occupants: {
    type: [Object],
    default: [],
  },
});

const rooms = mongoose.model("rooms", roomSchema);

export default rooms;
