const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var Cart = require("../models/cart");
var Buyer = require("../models/buyer");


const controllers = {};

controllers.cart_list = async (req, res) => {
  const data = await Cart.findAll({ include: [Buyer] });
  res.json(data);
};

controllers.cart_create = async (req, res) => {
  const { cartPrice, licenseNumber, idBuyer } = req.body;
  const cart = await Cart.create({
    cartPrice,
    licenseNumber,
    idBuyer
  });
  res.json(cart);
};

controllers.cart_update = async (req, res) => {
  let idReceived = req.params.id;
  const { cartDate, idCart } = req.body;
  const cart = await Cart.update(
    { cartDate, idCart },
    { where: { idCart: idReceived } }
  );

  res.json({ cart });
};

controllers.cart_detail = async (req, res) => {
  let idReceived = req.params.id;
  const data = await Cart.findOne({ where: { idCart: idReceived }, include: [Buyer] });
  res.json(data);
};

controllers.cart_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Cart.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

controllers.cart_findByBuyerId = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Cart.findOne({ where: { idBuyer: idReceived } });

  res.json(data);
};

module.exports = controllers;
