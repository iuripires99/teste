const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticketPrint', {
    idTicketPrint: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idTicket: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    linkPrint: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    
  });
};
