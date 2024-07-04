var Sequelize = require("sequelize");
var sequelize = require("./database");
const Admin = require("./admins");
const Product = require("./products");

var AdminProduct = sequelize.define("AdminProduct", {
  adminIdAdmin: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
    productIdProduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "idProduct",
      },
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });



  module.exports = AdminProduct;