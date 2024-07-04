const Sequelize = require('sequelize');
var sequelize = require("./database");
const Admin = require("./admins");
const Ticket = require("./tickets");

  var AdminTicket = sequelize.define("AdminTicket", {
    adminIdAdmin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "idAdmin",
      },
    },
    ticketIdTicket: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Ticket,
        key: "idTicket",
      },
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });


  module.exports = AdminTicket;
  