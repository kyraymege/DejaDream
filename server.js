const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan"); // Require morgan module
const authRoutes = require("./routes/auth");
const notificationRoutes = require("./routes/notification");
const diaryRoutes = require("./routes/diary");
const userRoutes = require("./routes/users");

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
// Use morgan as middleware to log HTTP requests
app.use(morgan("combined"));

app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notification", notificationRoutes);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log("Backend server is running");
});
