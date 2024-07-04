const Sequelize = require("sequelize");
const sequelize = require("./database");
const Buyer = require("./buyer");
const TicketStatus = require("./ticketStatus");
const TicketDepartment = require("./ticketDepartment");
const Manager = require("./manager");

const Ticket = sequelize.define('ticket', {
  idTicket: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ticketName: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  ticketDescription: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  ticketPrint: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  ticketDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  ticketPriority: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  idBuyer: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Buyer,
      key: 'idBuyer'
    }
  },
  idTicketStatus: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: TicketStatus,
      key: 'idTicketStatus'
    }
  },
  idTicketDepartment: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: TicketDepartment,
      key: 'idTicketDepartment'
    }
  },
  idManager: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Manager,
      key: 'idManager'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

  Ticket.belongsTo(Manager, { foreignKey: 'idManager' });
  Manager.hasMany(Ticket, { foreignKey: 'idManager' });

Ticket.belongsTo(Buyer, { foreignKey: 'idBuyer' });
Buyer.hasMany(Ticket, { foreignKey: 'idBuyer' });

Ticket.belongsTo(TicketDepartment, { foreignKey: 'idTicketDepartment' });
TicketDepartment.hasMany(Ticket, { foreignKey: 'idTicketDepartment' });

Ticket.belongsTo(TicketStatus, { foreignKey: 'idTicketStatus' });
TicketStatus.hasMany(Ticket, { foreignKey: 'idTicketStatus' });

module.exports = Ticket;
