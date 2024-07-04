const express = require("express");
const Buyer = require("../models/buyer");
const Manager = require("../models/manager");
const ManagerProduct = require("../models/ManagerProducts");
const Product = require("../models/products");

const controllers = {};

controllers.buyer_list = async (req, res) => {
  try {
    const data = await Buyer.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving buyers:', error);
    res.status(500).json({ message: 'Error retrieving buyers', error });
  }
};

controllers.buyer_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyer = await Buyer.findOne({ where: { buyerEmail: email, buyerPassword: password } });
    if (buyer) {
      res.status(200).json({ success: true, message: "Buyer login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred during login", error: error.message });
  }
};

controllers.buyer_create = async (req, res) => {
  try {
    const { buyerName, buyerNif, buyerEmail, buyerPassword, buyerCompany } = req.body;
    const buyer = await Buyer.create({
      buyerName,
      buyerNif,
      buyerEmail,
      buyerPassword,
      buyerCompany,
    });
    res.json(buyer);
  } catch (error) {
    console.error('Error creating buyer:', error);
    res.status(500).json({ message: 'Error creating buyer', error });
  }
};

controllers.buyer_update = async (req, res) => {
  try {
    let idReceived = req.params.id;
    const { buyerName, buyerNif, buyerEmail, buyerPassword, buyerCompany } = req.body;
    const buyer = await Buyer.update(
      { buyerName, buyerNif, buyerEmail, buyerPassword, buyerCompany },
      { where: { idBuyer: idReceived } }
    );
    res.json({ buyer });
  } catch (error) {
    console.error('Error updating buyer:', error);
    res.status(500).json({ message: 'Error updating buyer', error });
  }
};

controllers.buyer_getBuyerWithManagers = async (req, res) => {
  try {
    const idReceived = req.params.id;

    if (!idReceived) {
      console.error('ID parameter is missing or undefined');
      return res.status(400).json({ message: 'ID parameter is missing or undefined' });
    }

    // Convert idReceived to integer
    const buyerId = parseInt(idReceived, 10); // Parse as base 10 integer

    if (isNaN(buyerId)) {
      console.error('Invalid ID parameter');
      return res.status(400).json({ message: 'Invalid ID parameter' });
    }

    const buyer = await Buyer.findOne({
      where: { idBuyer: buyerId },
      include: [
        {
          model: Manager,
          as: 'managers',
          include: [
            {
              model: ManagerProduct,
              as: 'ManagerProducts',
              include: [
                {
                  model: Product,
                  as: 'product',
                }
              ]
            },
          ]
        }
      ]
    });

    if (!buyer) {
      console.log('Buyer not found');
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.json(buyer);
  } catch (error) {
    console.error('Error retrieving buyer:', error);
    res.status(500).json({ message: 'Error retrieving buyer', error });
  }
};

controllers.buyer_detail = async (req, res) => {
  try {
    let idReceived = req.params.id;

    if (!idReceived) {
      console.error('ID parameter is missing or undefined');
      return res.status(400).json({ message: 'ID parameter is missing or undefined' });
    }

    const data = await Buyer.findOne({ where: { idBuyer: idReceived } });

    if (!data) {
      console.log('Buyer not found');
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error retrieving buyer:', error);
    res.status(500).json({ message: 'Error retrieving buyer', error });
  }
};

controllers.buyer_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Buyer.destroy(
    {
      where: {
        idBuyer: idReceived
      }
    }
  );
  res.json({ message: "Deleted successfully!" });
};

module.exports = controllers;
