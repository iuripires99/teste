const Sequelize = require("sequelize");
const sequelize = require("./database");
const Buyer = require("./buyer");
const Bill = require("./bills");
const Product = require("./products");
const LicenseStatus = require("./licenseStatus");
const LicenseUser = require("./licenseUser");
const Manager = require("./manager");

const License = sequelize.define(
  "license",
  {
    idLicense: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    licenseDescript: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    idBuyer: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Buyer,
        key: "idBuyer",
      },
    },
    idBill: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Bill,
        key: "idBill",
      },
    },
    idLicenseStatus: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: LicenseStatus,
        key: "idLicenseStatus",
      },
    },
    idLicenseUser: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: LicenseUser,
        key: "idLicenseUser",
      },
    },
    idProduct: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Product,
        key: "idProduct",
      },
    },
    idManager: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Manager,
        key: "idManager",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Define associations
License.belongsTo(Buyer, { foreignKey: 'idBuyer' });
License.belongsTo(Bill, { foreignKey: 'idBill' });
License.belongsTo(LicenseStatus, { foreignKey: 'idLicenseStatus' });
License.belongsTo(LicenseUser, { foreignKey: 'idLicenseUser' });
License.belongsTo(Product, { foreignKey: 'idProduct' });
License.belongsTo(Manager, { foreignKey: 'idManager' });

module.exports = License;
