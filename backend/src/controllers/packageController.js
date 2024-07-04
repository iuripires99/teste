const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var Package = require("../models/package");


const controllers = {};

controllers.package_list = async (req, res) => {
  const data = await Package.findAll();
  res.json(data);
};

controllers.package_create = async (req, res) => {
  const { packageName, packagePrice } = req.body;
  const package= await Package.create({
    packageName, packagePrice
  });
  res.json(package);
};

controllers.package_update = async (req, res) => {
  let idReceived = req.params.id;
  const { packageName, packagePrice } = req.body;
  const package= await Package.update(
    { packageName, packagePrice },
    { where: { idPackage: idReceived } }
  );

  res.json({ package });
};

controllers.package_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Package.findOne({ where: { idPackage: idReceived } });
  res.json(data);
};

controllers.package_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Package.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
