const express = require("express");
const burger = require("../models/burger");
// module.exports = routes.firstRoute;

// attribute
const test = [{ thing1: "Hello" }];

module.exports = (app) => {
  app.get("/first", function (req, res) {
    console.log(`route working`);
    res.render("index", test[0]);
  });
};
