const Sequelize = require("sequelize");
const sequelize = require("./database"); // Adjust the path as necessary

const Product = sequelize.define('product', {
    idProduct: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    productPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    productVersion: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    productDescript: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    installations: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false, 
    freezeTableName: true
  });

module.exports = Product;
