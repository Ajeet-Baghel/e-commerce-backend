const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware

app.use("/", route); // Middleware

// Database Connection
mongoose
  .connect(
    "mongodb+srv://ajeetbaghel5565:Llyulkru2FQk8m28@cluster0.oybytac.mongodb.net/E-CommerceCT"
    
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch(() => console.log("DB Connection Failed"));

// Server Creation
app.get("/", (req, res) => {
  res.send("Hello From Express Js");
});

const PORT = 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running At Port ${PORT}`);
  }
});
