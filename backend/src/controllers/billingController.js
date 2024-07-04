const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const Bill = require("../models/bills");
const Cart = require("../models/cart");
const CartProduct = require("../models/CartProduct");
const Product = require("../models/products");
const Buyer = require("../models/buyer");

const controllers = {};

controllers.bill_list = async (req, res) => {
  const data = await Bill.findAll({ include: [Cart] });
  res.json(data);
};

controllers.bill_create = async (req, res) => {
  const { billDate, idCart } = req.body;
  const bill = await Bill.create({
    billDate,
    idCart,
  });
  res.json(bill);
};

controllers.bill_update = async (req, res) => {
  let idReceived = req.params.id;
  const { billDate, idCart } = req.body;
  const bill = await Bill.update(
    { billDate, idCart },
    { where: { idBill: idReceived } }
  );

  res.json({ bill });
};

controllers.bill_detail = async (req, res) => {
  let idReceived = req.params.id;
  const data = await Bill.findOne({ where: { idBill: idReceived } });
  res.json(data);
};

controllers.getBillDetails = async (req, res) => {
  const idBuyer = req.params.idBuyer; // Assuming idBuyer is passed in the URL params

  if (!idBuyer) {
    return res.status(400).json({ error: 'Missing idBuyer parameter' });
  }

  try {
    const bills = await Bill.findAll({
      include: [
        {
          model: Cart,
          attributes: ['licenseNumber'], // Select license number only
          where: { idBuyer }, // Filter carts by idBuyer
          include: [
            {
              model: Buyer, // Include buyer details
            },
            {
              model: Product, // Include products
              through: {
                model: CartProduct, // Include CartProduct to link Cart and Product
              },
              attributes: ['productName'], // Select product name only
            },
          ],
          attributes: ['cartPrice'], // Select cart price only
        },
      ],
      attributes: ['idBill', 'billDate'], // Select bill ID and bill date
    });

    res.json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Error fetching bills' });
  }
};

controllers.bill_getLastBillId = async (req, res) => {
  try {
    const lastBill = await Bill.findOne({
      order: [["idBill", "DESC"]],
      attributes: ["idBill"],
    });

    if (lastBill) {
      res.status(200).json({ idBill: lastBill.idBill });
    } else {
      res.status(404).json({ error: "No bills found" });
    }
  } catch (error) {
    console.error("Error fetching last bill id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controllers;
