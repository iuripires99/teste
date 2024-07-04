const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var LicenseUser = require("../models/licenseUser");


const controllers = {};

controllers.licenseUser_list = async (req, res) => {
  const data = await LicenseUser.findAll();
  res.json(data);
};

controllers.licenseUser_create = async (req, res) => {
  const { licenseUserEmail } = req.body;
  const licenseUser = await LicenseUser.create({
    licenseUserEmail
  });
  res.json(licenseUser);
};

controllers.licenseUser_update = async (req, res) => {
  let idReceived = req.params.id;
  const { licenseUserEmail } = req.body;
  const licenseUser = await LicenseUsers.update(
    { licenseUserEmail },
    { where: { idLicenseUser: idReceived } }
  );

  res.json({ licenseUser });
};

controllers.licenseUser_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await LicensUser.findOne({ where: { idLicenseUser: idReceived } });
  res.json(data);
};

controllers.licenseUser_delete = async (req, res) => {
  let idReceived = req.params.id;
  await LicenseUser.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
