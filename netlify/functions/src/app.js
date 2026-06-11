const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const cors = require("cors");

const app = express();

app.use(cors()); // CORS Policy
app.use(express.json()); // Middleware
app.use("/api", route); // API Routes for local and redirected requests
app.use("/.netlify/functions/api", route); // API Routes for direct function requests

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log("DB Connection Failed", err.message));

module.exports = app;
