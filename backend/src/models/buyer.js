var Sequelize = require("sequelize");
var sequelize = require("./database");
var Buyer = sequelize.define("buyer", {
  idBuyer: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  buyerName: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  buyerNif: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  buyerEmail: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  buyerPassword: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  buyerCompany: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Buyer;
