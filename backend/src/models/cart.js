var Sequelize = require("sequelize");
var sequelize = require("./database");
const Buyer = require("./buyer");
const CartProduct = require("./CartProduct");
const Product = require("./products");

var Cart = sequelize.define(
  "cart",
  {
    idCart: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cartPrice: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    licenseNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    idBuyer: {
      type: Sequelize.INTEGER,
      references: {
        model: Buyer,
        key: "idBuyer",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Buyer.hasOne(Cart, { foreignKey: 'idBuyer' });
Cart.belongsTo(Buyer, { foreignKey: 'idBuyer' });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartIdCart' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productIdProduct' });

module.exports = Cart;
