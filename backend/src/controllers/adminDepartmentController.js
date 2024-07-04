const express = require("express");
const sequelize = require("../models/database");
const { DataTypes } = require('sequelize');
var AdminDepartment = require("../models/adminDepartments");

const controllers = {};

controllers.admin_department_list = async (req, res) => {
  const data = await AdminDepartment.findAll({});
  res.json(data);
};

controllers.admin_department_create = async (req, res) => {
  const { adminDepartmentDescript } = req.body;
  const adminDepartment = await AdminDepartment.create({
    adminDepartmentDescript   
  });
  res.json(adminDepartment);
};

controllers.admin_department_update = async (req, res) => {
  let idReceived = req.params.id;
  const { adminDepartmentDescript } = req.body;
  const adminDepartment = await AdminDepartment.update(
    { adminDepartmentDescript },
    { where: { idDepartment: idReceived } }
  );

  res.json({ adminDepartment });
};

controllers.admin_department_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await AdminDepartment.findOne({ where: { idDepartment: idReceived } });
  res.json(data);
};

controllers.admin_department_delete = async (req, res) => {
  let idReceived = req.params.id;
  await AdminDepartment.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers; 