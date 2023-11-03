// const express = require("express");
const SignUpSchema = require("../model/SignUpSchema");
const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
///////////////////////////////////////////////////////////////////////
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
      let finduser = await SignUpSchema.findOne({ email: req.body.email });
      if (finduser) {
        res.json("User with this Email Already Registered");
      } else {
        const salt = await bcrypt.genSalt(Number(process.env.ROUND));
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new SignUpSchema({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
        });
        // res.send(User);
        newUser
          .save()
          .then((user) => {
            const payload = {
              id: user._id,
              firstName: req.body.firstName,
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 31556926 },
              (err, token) => {
                res.json({
                  success: true,
                  id: user._id,
                  firstName: user.firstName,
                  email: user.email,
                  token: token,
                });
              }
            );

            // res.json({ status: "User Saved in database", user });
          })
          .catch((err) =>
            res.send({ msg: "something error in saving ", err: err })
          );
      }
    } catch (error) {
      res.send(error);
    }
  }
});
// ../////////////////////////////////////////////////////////////
routes.get("/byemail", async (req, res) => {
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
////////////////////// //////////////////////////////////////
routes.get("/allusers", async (req, res) => {
  let users = await SignUpSchema.aggregate().project({
    password: 0,
    lastName: 0,
    date: 0,
    phone: 0,
    __v: 0,
  });
  res.send(users);
});

// ../////////////////////// //////////////////////////////////////
module.exports = routes;
