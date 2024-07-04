var Sequelize = require("sequelize");
var sequelize = require("./database");
var LicenseUser = sequelize.define(
  "licenseUser",
  {
    idLicenseUser: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    licenseUserEmail: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = LicenseUser;
