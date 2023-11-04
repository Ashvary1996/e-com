const SignUpSchema = require("../model/SignUpSchema");
const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

routes.post("/login", async (req, res) => {
  if (!req.body.firstName) {
    res.send("firstName Required");
  } else if (!req.body.password) {
    res.send("password Required");
  } else {
    try {
      let user = await SignUpSchema.findOne({ firstName: req.body.firstName });

      if (!user) {
        return res.status(400).json("Invalid Credentials");
      }
      let isPassMatch = bcrypt.compare(req.body.password, user.password);
      if (!isPassMatch) {
        return res.status(400).json("Invalid Credntials");
      }

      let payload = {
        id: user._id,
        firstName: req.body.firstName,
      };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, { expiresIn: 31556926 });

      res.json({
        logInSuccess: true,
        id: user._id,
        firstName: req.body.firstName,
        email: user.email,
        token: token,
      });
    } catch (error) {
      res.json("error", error);
    }
  }
});
module.exports = routes;
