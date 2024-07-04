const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var LicenseStatus = require("../models/licenseStatus");


const controllers = {};

controllers.licenseStatus_list = async (req, res) => {
  const data = await LicenseStatus.findAll();
  res.json(data);
};

controllers.licenseStatus_create = async (req, res) => {
  const { licenseStatusDescript } = req.body;
  const licenseStatus = await LicenseStatus.create({
    licenseStatusDescript
  });
  res.json(licenseStatus);
};

controllers.licenseStatus_update = async (req, res) => {
  let idReceived = req.params.id;
  const { licenseStatusDescript } = req.body;
  const licenseStatus = await LicenseStatus.update(
    { licenseStatusDescript },
    { where: { idLicenseStatus: idReceived } }
  );

  res.json({ licenseStatus });
};

controllers.licenseStatus_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await LicenseStatus.findOne({ where: { idLicenseStatus: idReceived } });
  res.json(data);
};

controllers.licenseStatus_delete = async (req, res) => {
  let idReceived = req.params.id;
  await LicenseStatus.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
