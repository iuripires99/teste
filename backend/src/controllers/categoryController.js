const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var Category = require("../models/categories");


const controllers = {};

controllers.category_list = async (req, res) => {
  const data = await Category.findAll();
  res.json(data);
};

controllers.category_create = async (req, res) => {
  const { categoryName } = req.body;
  const category = await Category.create({
    categoryName
  });
  res.json(category);
};

controllers.category_update = async (req, res) => {
  let idReceived = req.params.id;
  const { categoryName } = req.body;
  const category = await Category.update(
    { categoryName },
    { where: { idCategory: idReceived } }
  );

  res.json({ category });
};

controllers.category_detail = async (req, res) => {
  let idReceived = req.params.id;
  const data = await Category.findOne({ where: { idCategory: idReceived } });
  res.json(data);
};

controllers.category_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Category.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};


module.exports = controllers;