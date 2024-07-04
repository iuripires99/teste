var Sequelize = require("sequelize");
var sequelize = require("./database");

var Department = sequelize.define("adminDepartment", {
    idDepartment: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    adminDepartmentDescript: {
      type:Sequelize.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  module.exports = Department;
