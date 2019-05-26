// Export
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    product_name: {
      type: DataTypes.STRING
    },
    genre: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    stock_quantity: {
      type: DataTypes.INTEGER
    },
    img_url: {
      type: DataTypes.STRING
    }
  });
  return Product;
};
