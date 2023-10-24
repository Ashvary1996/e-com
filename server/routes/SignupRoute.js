// const express = require("express");
const SignUpSchema = require("../model/SignUpSchema");
const routes = require("express").Router();

routes.post("/login", (req, res) => {
  const User = new SignUpSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  User.save()
    .then(() => {
      res.send(User);
    })
    .catch((err) =>
      res.send({ msg: "user with this email already registered", err: err })
    );
});

module.exports = routes;
