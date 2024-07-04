const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var TicketDepartment = require("../models/ticketDepartment");


const controllers = {};


controllers.ticketDepartment_list = async (req, res) => {
  const data = await TicketDepartment.findAll();
  res.json(data);
};

controllers.ticketDepartment_create = async (req, res) => {
  const { departmentDescript } = req.body;
  const ticketDepartment = await TicketDepartment.create({
    departmentDescript
  });
  res.json(ticketDepartment);
};

controllers.ticketDepartment_update = async (req, res) => {
  let idReceived = req.params.id;
  const { departmentDescript } = req.body;
  const ticketDepartment = await TicketDepartment.update(
    { departmentDescript },
    { where: { idTicketDepartment: idReceived } }
  );

  res.json({ ticketDepartment });
};

controllers.ticketDepartment_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await TicketDepartment.findOne({ where: { idTicketDepartment: idReceived } });
  res.json(data);
};

controllers.ticketDepartment_delete = async (req, res) => {
  let idReceived = req.params.id;
  await TicketDepartment.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
