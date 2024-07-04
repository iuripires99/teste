var Sequelize = require("sequelize");
var sequelize = require("./database");

var budgetStatus = sequelize.define(
  "budgetStatus",
  {
    idBudgetStatus: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    budgetStatusDescript: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);


module.exports = budgetStatus;
