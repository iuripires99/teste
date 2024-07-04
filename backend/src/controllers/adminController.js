const express = require("express");
const sequelize = require("../models/database");
const { DataTypes } = require('sequelize');
var Admin = require("../models/admins");
const Department = require("../models/adminDepartments");

const controllers = {};

controllers.admin_list = async (req, res) => {
  const data = await Admin.findAll({
    include: [{
      model: Department,
      attributes: ['adminDepartmentDescript']
    }]
  });
  res.json(data);
};

controllers.admin_create = async (req, res) => {
  const { adminName, adminEmail, adminPassword, idDepartment } = req.body;
  const admin = await Admin.create({
    adminName,
    adminEmail,
    adminPassword,
    idDepartment,
  });
  res.json(admin);
};

controllers.admin_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Encontre o admin pelo email
    const admin = await Admin.findOne({ where: { adminEmail: email } });

    if (admin) {
      // Verifique se a senha corresponde (assumindo que a senha é armazenada como texto simples)
      if (admin.adminPassword === password) {
        res.status(200).json({ success: true, message: "Login de admin bem-sucedido" });
      } else {
        res.status(401).json({ success: false, message: "Email ou senha incorretos" });
      }
    } else {
      res.status(404).json({ success: false, message: "Admin não encontrado" });
    }
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ success: false, message: "Ocorreu um erro durante o login", error: error.message });
  }
};

controllers.admin_update = async (req, res) => {
  let idReceived = req.params.id;
  const { adminName, adminEmail, adminPassword, idDepartment } = req.body;
  const admin = await Admin.update(
    { adminName, adminEmail, adminPassword, idDepartment },
    { where: { idAdmin: idReceived } }
  );

  res.json({ admin });
};

controllers.admin_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Admin.findOne({ where: { idAdmin: idReceived } });
  res.json(data);
};

controllers.admin_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Admin.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
