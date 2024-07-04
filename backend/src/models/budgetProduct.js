var Sequelize = require("sequelize");
var sequelize = require("./database");
const Budget = require("./budget");
const Product = require("./products");

var BudgetProduct = sequelize.define("BudgetProduct", {
  budgetIdBudget: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Budget,
      key: "idBudget",
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
    productQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });



  module.exports = BudgetProduct;