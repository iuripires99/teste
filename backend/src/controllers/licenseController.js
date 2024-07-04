const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var License = require("../models/licenses");
var LicenseStatus = require("../models/licenseStatus");
var LicenseUser = require("../models/licenseUser");
var Bill = require("../models/bills");
var Buyer = require("../models/buyer");
var Product = require("../models/products");
var Manager = require("../models/manager");

const controllers = {};

controllers.license_list = async (req, res) => {
  try {
    const licenses = await License.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: Buyer, as: 'buyer' },
        { model: Bill, as: 'bill' },
        { model: LicenseStatus, as: 'licenseStatus' },
        { model: LicenseUser, as: 'licenseUser' },
        { model: Manager, as: 'manager' }
      ],
    });
    res.json(licenses);
  } catch (error) {
    console.error("Error retrieving licenses:", error);
    res.status(500).json({ error: "Error retrieving licenses" });
  }
};

controllers.license_create = async (req, res) => {
  const {
    licenseDescript,
    idBuyer,
    idBill,
    idLicenseStatus,
    idLicenseUser,
    idProduct,
  } = req.body;
  const license = await License.create({
    licenseDescript,
    idBuyer,
    idBill,
    idLicenseStatus,
    idLicenseUser,
    idProduct,
  });
  res.json(license);
};

controllers.license_update = async (req, res) => {
  let idReceived = req.params.id;
  const { licenseDescript, idBuyer, idBill, idLicenseStatus, idLicenseUser } =
    req.body;
  const license = await License.update(
    {
      licenseDescript,
      idBuyer,
      idBill,
      idLicenseStatus,
      idLicenseUser,
      idProduct,
    },
    { where: { idLicense: idReceived } }
  );

  res.json({ license });
};

controllers.license_detail = async (req, res) => {
  const idReceived = req.params.id;
  try {
    const license = await License.findOne({ 
      where: { idLicense: idReceived },
      include: [
        { model: Product, as: 'product' },
        { model: Buyer, as: 'buyer' },
        { model: Bill, as: 'bill' },
        { model: LicenseStatus, as: 'licenseStatus' },
        { model: LicenseUser, as: 'licenseUser' },
        { model: Manager, as: 'manager' }
      ],
    });
    res.json(license);
  } catch (error) {
    console.error("Error retrieving license details:", error);
    res.status(500).json({ error: "Error retrieving license details" });
  }
};

controllers.license_findByLicenseStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await License.count({ where: { idLicenseStatus: id } });
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error counting license by status:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error counting license by status",
        error: error.message,
      });
  }
};

controllers.license_delete = async (req, res) => {
  const idReceived = req.params.id;
  try {
    await License.destroy({ where: { idLicense: idReceived } });
    res.json({ success: true, message: "License deleted successfully" });
  } catch (error) {
    console.error("Error deleting license:", error);
    res.status(500).json({ error: "Error deleting license" });
  }
};

controllers.license_findByBuyerId = async (req, res) => {
  const idReceived = req.params.id;

  try {
    const licenses = await License.findAll({
      where: { idBuyer: idReceived },
      include: [
        { model: Product, as: 'product', through: { attributes: [] } },
        { model: Buyer, as: 'buyer' },
        { model: Bill, as: 'bill' },
        { model: LicenseStatus, as: 'licenseStatus' },
        { model: LicenseUser, as: 'licenseUser' },
        { model: Manager, as: 'manager' }
      ],
    });

    res.json(licenses);
  } catch (error) {
    console.error("Error retrieving licenses:", error);
    res.status(500).json({ error: "Error retrieving licenses" });
  }
};
module.exports = controllers;
