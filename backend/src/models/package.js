const Sequelize = require("sequelize");
var sequelize = require("./database");

var Package = sequelize.define('package', {
    idPackage: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    packageName: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    packagePrice: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }

  }, {
    timestamps: false,
    freezeTableName: true
  });

module.exports = Package;