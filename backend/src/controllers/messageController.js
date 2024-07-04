const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var Message = require("../models/message");
var Ticket = require("../models/tickets");


const controllers = {};

controllers.message_list = async (req, res) => {
  const data = await Message.findAll({include:[Ticket]});
  res.json(data);
};

controllers.message_create = async (req, res) => {
  const { messageText, idTicket } = req.body;
  const message = await Message.create({
    messageText, idTicket
  });
  res.json(message);
};

controllers.message_update = async (req, res) => {
  let idReceived = req.params.id;
  const { messageText, idTicket } = req.body;
  const message = await Message.update(
    { messageText, idTicket },
    { where: { idMessage: idReceived } }
  );

  res.json({ message });
};

controllers.message_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Message.findOne({ where: { idMessage: idReceived } });
  res.json(data);
};

controllers.message_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Message.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
