import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: new Date(),
  },
  year: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const notice = mongoose.model("notice", noticeSchema);

export default notice;
