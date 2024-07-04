const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var CartProduct = require("../models/CartProduct");


const controllers = {};

controllers.CartProduct_list = async (req, res) => {
  const data = await CartProduct.findAll();
  res.json(data);
};

controllers.CartProduct_create = async (req, res) => {
  const { cartIdCart, productIdProduct } = req.body;
  const cartProduct = await CartProduct.create({
    cartIdCart, productIdProduct
  });
  res.json(cartProduct);
};

controllers.CartProduct_update = async (req, res) => {
  let idReceived = req.params.id;
  const { cartIdCart, productIdProduct } = req.body;
  const cartProduct = await CartProduct.update(
    { cartIdCart, productIdProduct },
    { where: { productIdProduct: idReceived } }
  );

  res.json({ cartProduct });
};

controllers.CartProduct_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await CartProduct.findOne({ where: { productIdProduct: idReceived } });
  res.json(data);
};

controllers.CartProduct_delete = async (req, res) => {
  let idReceived = req.params.id;
  await CartProduct.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
