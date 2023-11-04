const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const CartSchema = require("../model/CartSchema");
routes.post("/cart", async (req, res) => {
  try {
    const cart = new CartSchema({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating,
    });
    // res.send(cart);
    cart
      .save()
      .then(() => res.send(cart))
      .catch((err) => console.log("err in saving", err));
  } catch (error) {
    console.log(error, "failed in creating cart");
  }
});

module.exports = routes;
