const Sequelize = require("sequelize");
const sequelize = require("./database");
const Admin = require("./admins");
const Budget = require("./budget");

const AdminBudget = sequelize.define('AdminBudget', {
  adminIdAdmin: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: "idAdmin",
    },
  },
  budgetIdBudget: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Budget,
      key: "idBudget",
    },
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = AdminBudget;
