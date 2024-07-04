const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var Budget = require("../models/budget");
var BudgetStatus = require("../models/budgetStatus");
var Cart = require("../models/cart");
var Buyer = require("../models/buyer");

const controllers = {};

controllers.budget_list = async (req, res) => {
  try {
    const data = await Budget.findAll({
      include: [
        { model: BudgetStatus },
        {
          model: Cart,
          include: [
            { model: Buyer, attributes: ['idBuyer', 'buyerName'] } // Include Buyer model inside Cart and select specific attributes
          ]
        }
      ]
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};


controllers.budget_create = async (req, res) => {
  const { budgetName, budgetDescript, date, idBudgetStatus, idCart } = req.body;
  const budget = await Budget.create({
    budgetName,
    budgetDescript,
    date,
    idBudgetStatus,
    idCart
  });
  res.json(budget);
};

controllers.budget_update = async (req, res) => {
  let idReceived = req.params.id;
  const { budgetName, budgetDescript, date, idBudgetStatus, idCart } = req.body;

  try {
      const updatedBudget = await Budget.update(
          { budgetName, budgetDescript, date, idBudgetStatus, idCart },
          { where: { idBudget: idReceived } }
      );

      if (updatedBudget[0] === 0) {
          return res.status(404).json({ success: false, message: 'Budget not found' });
      }

      res.json({ success: true, updatedBudget });
  } catch (error) {
      console.error('Error updating budget:', error);
      res.status(500).json({ success: false, error: 'Failed to update budget' });
  }
};

controllers.budget_detail = async (req, res) => {
  let idReceived = req.params.id;
  const data = await Budget.findOne({ where: { idBudget: idReceived }, include: [BudgetStatus, Cart] });
  res.json(data);
};

controllers.budget_findByCart = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Budget.findAll({ where: { idCart: idReceived }, include: [
 
    { model: BudgetStatus, as: 'budgetStatus' }

  ] });

  res.json(data);
};

controllers.budget_findByBudgetStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Budget.count({ where: { idBudgetStatus: id } });
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error counting Budget by status:', error);
    res.status(500).json({ success: false, message: 'Error counting Budget by status', error: error.message });
  }
};


controllers.budget_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Budget.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
