const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running...");
});
