const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const ManagerProduct = require('../models/ManagerProducts');

const controllers = {};

// Controller para obter todos os registros de ManagerProduct
controllers.getAllManagerProducts = async (req, res) => {
  try {
    const managerProducts = await ManagerProduct.findAll();
    res.status(200).json(managerProducts);
  } catch (error) {
    console.error('Error fetching manager products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller para criar um novo registro de ManagerProduct
controllers.createManagerProduct = async (req, res) => {
  const { managerIdManager, productIdProduct } = req.body;

  try {
    const newManagerProduct = await ManagerProduct.create({
      managerIdManager,
      productIdProduct,
    });
    res.status(201).json(newManagerProduct);
  } catch (error) {
    console.error('Error creating manager product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller para buscar um registro de ManagerProduct por ID
controllers.getManagerProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const managerProduct = await ManagerProduct.findByPk(id);
    if (managerProduct) {
      res.status(200).json(managerProduct);
    } else {
      res.status(404).json({ error: 'ManagerProduct not found' });
    }
  } catch (error) {
    console.error('Error fetching manager product by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller para atualizar um registro de ManagerProduct por ID
controllers.updateManagerProduct = async (req, res) => {
  const { id } = req.params;
  const { managerIdManager, productIdProduct } = req.body;

  try {
    const managerProduct = await ManagerProduct.findByPk(id);
    if (managerProduct) {
      managerProduct.managerIdManager = managerIdManager;
      managerProduct.productIdProduct = productIdProduct;
      await managerProduct.save();
      res.status(200).json(managerProduct);
    } else {
      res.status(404).json({ error: 'ManagerProduct not found' });
    }
  } catch (error) {
    console.error('Error updating manager product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller para deletar um registro de ManagerProduct por ID
controllers.deleteManagerProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const managerProduct = await ManagerProduct.findByPk(id);
    if (managerProduct) {
      await managerProduct.destroy();
      res.status(204).json({ message: 'ManagerProduct deleted successfully' });
    } else {
      res.status(404).json({ error: 'ManagerProduct not found' });
    }
  } catch (error) {
    console.error('Error deleting manager product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = controllers;