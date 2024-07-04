var Sequelize = require("sequelize");
var sequelize = require("./database");
const Cart = require("./cart");
const Product = require("./products");

var CartProduct = sequelize.define(
  "CartProduct",
  {
    cartIdCart: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: "idCart",
      },
    },
    productIdProduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "idProduct",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);


module.exports = CartProduct;
