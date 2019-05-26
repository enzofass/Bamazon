// Dependencies
const db = require("../models");

// Routes
module.exports = function(app) {
  // GET all products
  app.get("/api/products/", function(req, res) {
    db.Product.findAll().then(function(result) {
      res.json(result);
    });
  });

  // Get product for genre
  app.get("/api/products/genre/:genre", function(req, res) {
    db.Product.findAll({
      where: {
        genre: req.params.genre
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};
