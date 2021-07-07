import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import studentRoutes from "./routes/student.js";
import adminRoutes from "./routes/admin.js";
import wardenRoutes from "./routes/warden.js";
import roomRoutes from "./routes/room.js";
import resetPasswordRoutes from "./routes/resetPassword.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/warden", wardenRoutes);
app.use("/room", roomRoutes);
app.use("/", resetPasswordRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port: ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
