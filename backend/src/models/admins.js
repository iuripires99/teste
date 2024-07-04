var Sequelize = require("sequelize");
var sequelize = require("./database");
const Department = require("./adminDepartments");
var Admin = sequelize.define("admin",
   {
    idAdmin: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    adminName: {
      type: Sequelize.STRING(255),
   
    },
    adminEmail: {
      type: Sequelize.STRING(255),
     
    },
    adminPassword: {
      type: Sequelize.STRING(255),
      
    },
    idDepartment: {
      type: Sequelize.INTEGER,
      // referência a outro modelo
      references: {
        model: Department,
        key: "idDepartment",
      },
    },
  }, 
  {
    timestamps: false,
    freezeTableName: true
  }
);

Department.hasMany(Admin, { foreignKey: 'idDepartment' });
Admin.belongsTo(Department, { foreignKey: 'idDepartment' });


module.exports = Admin;