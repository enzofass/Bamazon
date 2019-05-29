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

  app.get("/api/products/:id", function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json({ err: err });
      });
  });

  // PUT route for updating posts
  app.put("/api/products/:id", function(req, res) {
    db.Product.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function(result) {
        res.json({ message: "Updating complete" });
      })
      .catch(function(err) {
        res.json({ error: err });
      });
  });
};
