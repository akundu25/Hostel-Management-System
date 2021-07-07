import express from "express";
import {
  insertRoom,
  fetchRooms,
  addOccupant,
  deleteOccupant,
  getStudents,
} from "../controllers/rooms/room.js";

const router = express.Router();

router.post("/", insertRoom);
router.get("/:year", fetchRooms);
router.patch("/add-occupant/:roomId", addOccupant);
router.patch("/delete-occupant/:studentId/:roomId", deleteOccupant);
router.get("/students/:year", getStudents);

export default router;
