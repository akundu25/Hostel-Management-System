import wardenProfile from "../../models/wardenProfile.js";
import grievanceModel from "../../models/studentGrievances.js";
import notice from "../../models/notice.js";
import mongoose from "mongoose";
import studentProfile from "../../models/studentProfile.js";
import rooms from "../../models/room.js";

export const getStudents = async (req, res) => {
  res.status(200).json(res.paginatedResults);
};

export const fetchStudentGrievances = async (req, res) => {
  const year = req.year;

  try {
    const grievances = await grievanceModel.find({ year: year });

    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const changeGrievanceStatus = async (req, res) => {
  const { grievanceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(grievanceId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No such grievance exists" }] });

  try {
    const grievance = await grievanceModel.findById(grievanceId);

    const statusValue = grievance.status === "Active" ? "Resolved" : "Active";

    const updatedGrievance = await grievanceModel.findByIdAndUpdate(
      { _id: grievanceId },
      { $set: { status: statusValue } },
      { new: true }
    );

    res.status(200).json(updatedGrievance);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const deleteGrievance = async (req, res) => {
  const { grievanceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(grievanceId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No such grievance exists" }] });

  try {
    await grievanceModel.deleteOne({ _id: grievanceId });

    res.status(200).json({ message: "Grievance deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const wardenNotices = async (req, res) => {
  const noticeBody = req.body;

  try {
    const newNotice = await notice.create(noticeBody);
    res.status(200).json(newNotice);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const viewWardenNotices = async (req, res) => {
  const year = req.year;

  try {
    const wardenNotices = await notice.find({ year: year });

    res.status(200).json(wardenNotices);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const deleteWardenNotice = async (req, res) => {
  const { noticeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noticeId))
    return res.status(404).json({ errors: [{ msg: "No such notice exists" }] });

  try {
    await notice.deleteOne({ _id: noticeId });

    res
      .status(200)
      .json({ message: "The notice has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getWardenProfile = async (req, res) => {
  const wardenId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(wardenId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No warden exists with this id" }] });

  try {
    const profile = await wardenProfile.findById(wardenId, { password: 0 });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const updateWardenProfile = async (req, res) => {
  const profile = req.body;
  const wardenId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(wardenId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No warden exists with this id" }] });

  try {
    const updatedWardenProfile = await wardenProfile.findByIdAndUpdate(
      wardenId,
      profile,
      { new: true, fields: { password: 0 } }
    );

    res.status(200).json(updatedWardenProfile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getUnallocatedStudents = async (req, res) => {
  const { year } = req.params;

  try {
    const unallocatedStudents = await studentProfile.find(
      { application_status: "Pending", year: year },
      { _id: 1, name: 1, email: 1, roll: 1 }
    );
    res.status(200).json(unallocatedStudents);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getAvailableRooms = async (req, res) => {
  const { year } = req.params;

  try {
    const totalRooms = await rooms.find({ year: year });
    const availableRooms = totalRooms.filter(
      (room) =>
        (room.room_type === "Single" && !room.occupants.length) ||
        (room.room_type === "Non Single" && room.occupants.length < 4)
    );
    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const cancelApplication = async (req, res) => {
  const { studentId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId))
    return res
      .status(400)
      .json({ errors: [{ msg: "The student id is not valid" }] });

  try {
    await studentProfile.findByIdAndUpdate(studentId, {
      $set: { application_status: status },
    });
    res
      .status(200)
      .json({ message: "The application status has been updated" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
