var Sequelize = require("sequelize");
var sequelize = require("./database");
var LicenseStatus = sequelize.define(
  "licenseStatus",
  {
    idLicenseStatus: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    licenseStatusDescript: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = LicenseStatus;
