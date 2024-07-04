const Sequelize = require("sequelize");
var sequelize = require("./database");
const Manager = require("./manager");
const License = require("./licenses");


var ManagerLicense =  sequelize.define('ManagerLicense', {
    managerIdManager: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Manager,
        key: "idManager",
      },
    },
    licenseIdLicense: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: License,
        key: "idLicense",
      },
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

module.exports = ManagerLicense;
