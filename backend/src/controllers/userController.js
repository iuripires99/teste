const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admins");
const Buyer = require("../models/buyer");
const Manager = require("../models/manager");
const config = require("../config");
const sequelize = require("../models/database");

const controllers = {};

controllers.list = async (req, res) => {
    try {
      // Fetch all records from Admin table
      const admins = await Admin.findAll();
  
      // Fetch all records from Buyer table
      const buyers = await Buyer.findAll();
  
      // Fetch all records from Manager table
      const managers = await Manager.findAll();
  
      // Construct response object with data from all tables
      const data = {
        admins,
        buyers,
        managers
      };
  
      res.json({ success: true, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ success: false, message: 'Error fetching data', error: error.message });
    }
  };

controllers.register = async (req, res) => {
  const { type, name, email, password } = req.body;

  try {
    let newUser;
    switch (type) {
      case 'admin':
        newUser = await Admin.create({ adminName: name, adminEmail: email, adminPassword: password });
        break;
      case 'buyer':
        newUser = await Buyer.create({ buyerName: name, buyerEmail: email, buyerPassword: password });
        break;
      case 'manager':
        newUser = await Manager.create({ managerName: name, managerEmail: email, managerPassword: password });
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid user type' });
    }

    res.status(200).json({ success: true, message: 'Registered successfully', data: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

controllers.login = async (req, res) => {
    const { email, password, type } = req.body;
  
    try {
      let user;
      switch (type) {
        case 'admin':
          user = await Admin.findOne({ where: { adminEmail: email } });
          break;
        case 'buyer':
          user = await Buyer.findOne({ where: { buyerEmail: email } });
          break;
        case 'manager':
          user = await Manager.findOne({ where: { managerEmail: email } });
          break;
        default:
          return res.status(400).json({ success: false, message: 'Invalid user type' });
      }
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(403).json({ success: false, message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email, type }, config.secret, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ success: true, message: 'Authentication successful', token, user });
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ success: false, message: 'Authentication failed', error: error.message });
    }
  };

module.exports = controllers;
