const Sequelize = require("sequelize");
const sequelize = require("./database");
const Manager = require("./manager");
const Product = require("./products");

const ManagerProduct = sequelize.define(
  "ManagerProduct",
  {
    managerIdManager: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Manager,
        key: "idManager",
      },
    },
    productIdProduct: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Product,
        key: "idProduct",
      },
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Manager.hasMany(ManagerProduct, { foreignKey: 'managerIdManager' });
ManagerProduct.belongsTo(Manager, { foreignKey: 'managerIdManager' });

Product.hasMany(ManagerProduct, { foreignKey: 'productIdProduct' });
ManagerProduct.belongsTo(Product, { foreignKey: 'productIdProduct' });

module.exports = ManagerProduct;
