const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const BudgetProduct = require("../models/budgetProduct"); 

const controllers = {};

controllers.BudgetProduct_create = async (req, res) => {
    const { budgetIdBudget, productIdProduct, productQuantity } = req.body;
  
    try {
      const newBudgetProduct = await BudgetProduct.create({
        budgetIdBudget,
        productIdProduct,
        productQuantity
      });
  
      res.status(201).json({ success: true, message: 'BudgetProduct created successfully', data: newBudgetProduct });
    } catch (error) {
      console.error('Error creating BudgetProduct:', error);
      res.status(500).json({ success: false, message: 'Failed to create BudgetProduct', error: error.message });
    }
  };

  controllers.BudgetProduct_getAll = async (req, res) => {
    try {
      const budgetProducts = await BudgetProduct.findAll();
      res.status(200).json({ success: true, data: budgetProducts });
    } catch (error) {
      console.error('Error fetching BudgetProducts:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch BudgetProducts', error: error.message });
    }
  };
  

  controllers.BudgetProduct_getById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const budgetProduct = await BudgetProduct.findByPk(id);
      if (!budgetProduct) {
        return res.status(404).json({ success: false, message: 'BudgetProduct not found' });
      }
      res.status(200).json({ success: true, data: budgetProduct });
    } catch (error) {
      console.error('Error fetching BudgetProduct:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch BudgetProduct', error: error.message });
    }
  };

  controllers.BudgetProduct_update = async (req, res) => {
    const { id } = req.params;
    const { budgetIdBudget, productIdProduct, productQuantity } = req.body;
  
    try {
      let budgetProduct = await BudgetProduct.findByPk(id);
      if (!budgetProduct) {
        return res.status(404).json({ success: false, message: 'BudgetProduct not found' });
      }
  
      budgetProduct.budgetIdBudget = budgetIdBudget;
      budgetProduct.productIdProduct = productIdProduct;
      budgetProduct.productQuantity = productQuantity;
  
      await budgetProduct.save();
  
      res.status(200).json({ success: true, message: 'BudgetProduct updated successfully', data: budgetProduct });
    } catch (error) {
      console.error('Error updating BudgetProduct:', error);
      res.status(500).json({ success: false, message: 'Failed to update BudgetProduct', error: error.message });
    }
  };

  
  controllers.BudgetProduct_delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const budgetProduct = await BudgetProduct.findByPk(id);
      if (!budgetProduct) {
        return res.status(404).json({ success: false, message: 'BudgetProduct not found' });
      }
  
      await budgetProduct.destroy();
  
      res.status(200).json({ success: true, message: 'BudgetProduct deleted successfully' });
    } catch (error) {
      console.error('Error deleting BudgetProduct:', error);
      res.status(500).json({ success: false, message: 'Failed to delete BudgetProduct', error: error.message });
    }
  };
  
  module.exports = controllers;