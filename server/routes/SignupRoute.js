// const express = require("express");
const SignUpSchema = require("../model/SignUpSchema");
const routes = require("express").Router();

routes.post("/signup", async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone
  ) {
    res.send("Please Fill all the details...");
  } else {
    try {
      const User = new SignUpSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });

      await User.save()
        .then(() => {
          res.json({ status: "User Saved in database", User });
        })
        .catch((err) =>
          res.send({ msg: "user with this email already registered", err: err })
        );
    } catch (error) {
      res.send(error);
    }
  }
});
// ../////////////////////////////////////////////////////////////
routes.get("/signup", async (req, res) => {
  try {
    const emailCheck = await SignUpSchema.find({ email: req.body.email });
    if (emailCheck.length == 0) {
      res.json({ Status: "Not a Member", userData: emailCheck });
    } else if (emailCheck[0].email == req.body.email) {
      res.json({
        Status: "Registered User",
        userData: emailCheck,
        EmailFound: emailCheck.length,
      });
    }

    // res.json(emailCheck.length)
  } catch (error) {
    res.status(500).json({ msg: "error in fetching email", error: error });
  }
});

// ../////////////////////////////////////////////////////////////
module.exports = routes;
