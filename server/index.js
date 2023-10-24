const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;
const uri = "mongodb://0.0.0.0:27017/ecom";
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

// .................................//

mongoose
  .connect(uri)
  .then(() => console.log("Connected To Database Successfully"))
  .catch((err) => console.log(err, "error in connecting to database"));

app.listen(port, () => {
  console.log("Server is up with port :", port);
});
