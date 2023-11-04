const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URI;
// .................................//
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
// ........................
app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.use("/api", require("./routes/SignupRoute"));
app.use("/api", require("./routes/LoginRoute"));
app.use("/api", require("./routes/Cart"));

// .................................//

mongoose
  .connect(uri)
  .then(() => console.log("Connected To Database Successfully"))
  .catch((err) => console.log(err, "error in connecting to database"));

app.listen(port, () => {
  console.log("Server is up with port :", port);
});
