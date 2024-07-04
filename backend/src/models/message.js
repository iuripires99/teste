const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    idMessage: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messageText: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idTicket: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tickets',
        key: 'idTicket'
      }
    },
    ticketIdTicket: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tickets',
        key: 'idTicket'
      }
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "messages_pkey",
        unique: true,
        fields: [
          { name: "idMessage" },
        ]
      },
    ]
  });
};
