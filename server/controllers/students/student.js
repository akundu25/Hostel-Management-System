import studentProfile from "../../models/studentProfile.js";
import grievanceModel from "../../models/studentGrievances.js";
import notice from "../../models/notice.js";
import mongoose from "mongoose";

export const fetchStudent = async (req, res) => {
  const studentId = req.userId;
  try {
    const student = await studentProfile.findById(studentId, {
      password: 0,
    });

    if (!student)
      return res
        .status(404)
        .json({ errors: [{ msg: "No student found with this id" }] });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const updateStudentProfile = async (req, res) => {
  const profile = req.body;
  const studentId = req.userId;

  if (profile.semester < 1 && profile.semester > 8)
    return res
      .status(400)
      .json({ errors: [{ msg: "The semester value is invalid" }] });
  else if (profile.semester <= 2) profile.year = 1;
  else if (profile.semester <= 4) profile.year = 2;
  else if (profile.semester <= 6) profile.year = 3;
  else if (profile.semester <= 8) profile.year = 4;

  try {
    const updatedStudentProfile = await studentProfile.findByIdAndUpdate(
      studentId,
      profile,
      { new: true, fields: { _id: 0, password: 0 } }
    );

    res.status(200).json(updatedStudentProfile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const reportGrievance = async (req, res) => {
  const grievance = req.body;
  grievance.studentId = req.userId;

  try {
    await grievanceModel.create(grievance);
    res.status(200).json({ message: "Grievance reported successfully" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const fetchGrievances = async (req, res) => {
  const studentId = req.userId;

  try {
    const grievances = await grievanceModel.find(
      { studentId: studentId },
      { _id: 0, email: 0, studentId: 0, name: 0, mobile: 0, roll: 0 }
    );
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getWardenNotices = async (req, res) => {
  const year = req.year;

  try {
    const wardenNotices = await notice.find({ year: year });

    res.status(200).json(wardenNotices);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const applyAgain = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId))
    return res
      .status(400)
      .json({ errors: [{ msg: "The student id is invalid" }] });

  try {
    const updatedStudent = await studentProfile.findByIdAndUpdate(
      studentId,
      { $set: { application_status: "Pending" } },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
