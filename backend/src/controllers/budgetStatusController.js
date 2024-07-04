const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var BudgetStatus = require("../models/budgetStatus");

const controllers = {};

controllers.budgetStatus_list = async (req, res) => {
  const data = await BudgetStatus.findAll();
  res.json(data);
};

controllers.budgetStatus_create = async (req, res) => {
  const { budgetStatusDescript } = req.body;
  const budgetStatus = await BudgetStatus.create({
    budgetStatusDescript
  });
  res.json(budgetStatus);
};

controllers.budgetStatus_update = async (req, res) => {
  let idReceived = req.params.id;
  const { budgetStatusDescript } = req.body;
  const budgetStatus = await BudgetStatus.update(
    { budgetStatusDescript },
    { where: { idBudgetStatus: idReceived } }
  );

  res.json({ budgetStatus });
};

controllers.budgetStatus_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await BudgetStatus.findOne({ where: { idBudgetStatus: idReceived } });
  res.json(data);
};

controllers.budgetStatus_delete = async (req, res) => {
  let idReceived = req.params.id;
  await BudgetStatus.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
