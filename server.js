const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

// environmentals varibales
const DBURI = process.env.DBURI;
const PORT = process.env.PORT || 5000;

// function
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("database connected ✅");
  })
  .catch((err) => {
    console.log(err);
    console.log("can't coonect to database ❌");
  });
// middlewares
app.use(express.json());
app.use("/api/user", require("./routes/user"));

// routes
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is up and runing on port :${PORT}`);
});
