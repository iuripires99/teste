const express = require("express");
const sequelize = require("../models/database");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
var Product = require("../models/products");
const License = require('../models/licenses');

const controllers = {};

controllers.product_list = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controllers.top_products = async (req, res) => {
  try {
      const products = await Product.findAll({
          include: [{
              model: License,
              required: false, // Use left join
              attributes: [], // Exclude attributes from License
          }],
          attributes: [
              'idProduct',
              'productName',
              'productPrice',
              'productVersion',
              'productDescript',
              'installations',
              'image',
              [sequelize.fn('COUNT', sequelize.col('licenses.idLicense')), 'licenseCount']
          ],
          group: [
              'Product.idProduct',
              'productName',
              'productPrice',
              'productVersion',
              'productDescript',
              'installations',
              'image'
          ], // Group by Product to count licenses
          order: [[sequelize.literal('licenseCount'), 'DESC']], // Order by license count descending
      });

      res.json(products);
  } catch (error) {
      console.error("Error fetching products with licenses:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};


controllers.product_create = async (req, res) => {
  try {
    const { productName, productPrice, productVersion, productDescript, installations, image } = req.body;

    // Basic validation
    if (!productName || !productPrice || !productVersion || !productDescript || !installations || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = await Product.create({
      productName, productPrice, productVersion, productDescript, installations, image
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


controllers.product_update = async (req, res) => {
  let idReceived = req.params.id;
  const {
    productName,
    productPrice,
    productVersion,
    productDescript,
    installations,
    image,
  } = req.body;

  try {
    const product = await Product.update(
      {
        productName,
        productPrice,
        productVersion,
        productDescript,
        installations,
        image,
      },
      { where: { idProduct: idReceived } }
    );

    if (product) {
      res.json({
        success: true,
        data: product,
        message: "Product updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

controllers.product_detail = async (req, res) => {
  try {
    let idReceived = req.params.id;
    
    // Validate idReceived (ensure it's a valid integer)
    if (!Number.isInteger(Number(idReceived))) {
      return res.status(400).json({ error: 'Invalid idProduct' });
    }
    
    const data = await Product.findOne({ where: { idProduct: idReceived } });
    
    if (!data) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(data);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


controllers.product_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Product.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
