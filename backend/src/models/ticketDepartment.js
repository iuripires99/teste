const Sequelize = require("sequelize");
var sequelize = require("./database");

var TicketDepartment = sequelize.define('ticketDepartment', {
    idTicketDepartment: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    departmentDescript: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  }, {
   timestamps: false,
   freezeTableName: true
  });
module.exports = TicketDepartment;