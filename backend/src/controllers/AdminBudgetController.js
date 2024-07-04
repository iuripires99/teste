const express = require("express");

const sequelize = require("../models/database");
const { DataTypes } = require('sequelize');
var AdminBudget = require("../models/AdminBudget");
var initModels = require("../models/init-models");


const controllers = {};


controllers.adminBudget_list = async (req, res) => {
  const data = await AdminBudget.findAll();
  res.json(data);
};

controllers.adminBudget_create = async (req, res) => {
  const { adminIdAdmin, budgetIdBudget } = req.body;
  const adminBudget = await AdminBudget.create({
   adminIdAdmin, budgetIdBudget
  });
  res.json(adminBudget);
};

controllers.adminBudget_update = async (req, res) => {
  let idReceived = req.params.id;
  const { adminIdAdmin, budgetIdBudget } = req.body;
  const adminBudget = await AdminBudget.update(
    { adminIdAdmin, budgetIdBudget },
    { where: { adminIdAdmin: idReceived } }
  );

  res.json({ adminBudget });
};

controllers.adminBudget_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await AdminBudget.findOne({ where: { adminIdAdmin: idReceived } });
  res.json(data);
};

controllers.adminBudget_delete = async (req, res) => {
  let idReceived = req.params.id;
  await AdminBudget.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
