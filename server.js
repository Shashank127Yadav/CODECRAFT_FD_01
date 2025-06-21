require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

connectDB();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

app.use("/api", authRoutes);

app.use((req, res, next) => {
  console.log(`🟡 ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error("Error middleware:", err.stack);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    msg: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
