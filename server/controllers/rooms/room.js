import mongoose from "mongoose";
import rooms from "../../models/room.js";
import studentProfile from "../../models/studentProfile.js";

export const insertRoom = async (req, res) => {
  const room = req.body;

  try {
    const newRoom = await rooms.create(room);

    res.status(200).json(newRoom);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const fetchRooms = async (req, res) => {
  const { year } = req.params;

  try {
    const fetchedRooms = await rooms.find({ year: year });

    res.status(200).json(fetchedRooms);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const addOccupant = async (req, res) => {
  const { roomId } = req.params;
  const student = req.body;

  try {
    const room = await rooms.findById(roomId);

    if (
      (room.room_type === "Single" && room.occupants.length) ||
      (room.room_type === "Non Single" && room.occupants.length === 4)
    )
      return res
        .status(404)
        .json({ errors: [{ msg: "The room is occupied" }] });

    const occupantExist = room.occupants.find(
      (occupant) => occupant._id === student._id
    );

    if (room.occupants.length && occupantExist)
      return res
        .status(404)
        .json({ errors: [{ msg: "The student already lives in the room" }] });

    if (!student._id)
      return res
        .status(400)
        .json({ errors: [{ msg: "Wrong student details" }] });

    const updatedRoom = await rooms.findByIdAndUpdate(
      roomId,
      { $push: { occupants: student } },
      { new: true }
    );

    await studentProfile.findByIdAndUpdate(student._id, {
      $set: {
        room_number: updatedRoom.room_number,
        application_status: "Allocated",
      },
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const deleteOccupant = async (req, res) => {
  const { studentId, roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No room exists with this id" }] });

  if (!mongoose.Types.ObjectId.isValid(studentId))
    return res
      .status(404)
      .json({ errors: [{ msg: "No student exists with this id " }] });

  try {
    const room = await rooms.findById(roomId);

    if (!room.occupants.length)
      return res.status(404).json({ errors: [{ msg: "No occupants exists" }] });

    let match = false;
    for (let student of room.occupants) {
      if (student._id === studentId) {
        match = true;
        break;
      }
    }

    if (!match)
      return res
        .status(404)
        .json({ errors: [{ msg: "No occupant with that id exists" }] });

    const updatedRoom = await rooms.findByIdAndUpdate(
      roomId,
      {
        $pull: { occupants: { _id: studentId } },
      },
      { new: true }
    );

    await studentProfile.findByIdAndUpdate(studentId, {
      $set: { room_number: "" },
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

export const getStudents = async (req, res) => {
  const { year } = req.params;

  try {
    const students = await studentProfile.find(
      { year: year },
      { _id: 1, name: 1, email: 1, roll: 1 }
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
