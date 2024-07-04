var Sequelize = require("sequelize");
var sequelize = require("./database");
const Cart = require("./cart");

var Bill = sequelize.define(
  "bill",
  {
    idBill: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    billDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    idCart: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Cart,
        key: "idCart",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Cart.hasMany(Bill, { foreignKey: 'idCart' });
Bill.belongsTo(Cart, { foreignKey: 'idCart' });

module.exports = Bill;
