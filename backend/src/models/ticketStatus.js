const Sequelize = require("sequelize");
var sequelize = require("./database");

var TicketStatus = sequelize.define('ticketStatus', {
    idTicketStatus: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    statusDescript: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
    
  });
  module.exports = TicketStatus;