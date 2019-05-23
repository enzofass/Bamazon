// Dependencies
// Require sequelize library
const Sequelize = require("sequelize");
// Require the connection to the db ()
const sequelize = require("../config/config.json");
// Create sequelize model for Product
const Product = sequelize.define("Product", {
  product_name: Sequelize.STRING,
  department_name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  stock_quantity: Sequelize.INTEGER
})

// Sync with DB
Product.sync();

// Export
module.export = Product;