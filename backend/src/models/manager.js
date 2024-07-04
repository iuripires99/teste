var Sequelize = require("sequelize");
var sequelize = require("./database");
const Buyer = require("./buyer");

var Manager = sequelize.define('manager', 
  {
    idManager: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    managerName: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    managerNif: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    managerEmail: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    managerPassword: {
      type: Sequelize.STRING(255),
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
    
  }, {
    timestamps: false,
    freezeTableName: true
  });

  Manager.belongsTo(Buyer, { foreignKey: 'idBuyer' });
  Buyer.hasMany(Manager, { foreignKey: 'idBuyer' });

module.exports = Manager;