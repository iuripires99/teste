const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var AdminProduct = require("../models/AdminProduct");

const controllers = {};

controllers.adminProduct_list = async (req, res) => {
  const data = await AdminProduct.findAll();
  res.json(data);
};

controllers.adminProduct_create = async (req, res) => {
  const { adminIdAdmin, productIdProduct } = req.body;
  const adminProduct = await AdminProduct.create({
    adminIdAdmin, productIdProduct
  });
  res.json(adminProduct);
};

controllers.adminProduct_update = async (req, res) => {
  let idReceived = req.params.id;
  const { adminIdAdmin, productIdProduct } = req.body;
  const adminProduct = await AdminProduct.update(
    { adminIdAdmin, productIdProduct },
    { where: { adminIdAdmin: idReceived } }
  );

  res.json({ adminProduct });
};

controllers.adminProduct_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await AdminProduct.findOne({ where: { adminIdAdmin: idReceived } });
  res.json(data);
};

controllers.adminProduct_delete = async (req, res) => {
  let idReceived = req.params.id;
  await AdminProduct.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
