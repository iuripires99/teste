var Sequelize = require("sequelize");
var sequelize = require("./database");
var Category = sequelize.define(
  "category",
  {
    idCategory: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Category;
