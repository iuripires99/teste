// ticketController.js

const express = require("express");
const router = express.Router();
const Ticket = require("../models/tickets");
const Buyer = require("../models/buyer");
const TicketStatus = require("../models/ticketStatus"); // Import TicketStatus model
const TicketDepartment = require("../models/ticketDepartment");
const Manager = require("../models/manager");

const controllers = {};

controllers.ticket_list = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: Buyer, as: 'buyer' },
        { model: TicketStatus, as: 'ticketStatus' },
        { model: TicketDepartment, as: 'ticketDepartment' },
        { model: Manager, as: 'manager' }
      ]
    });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


controllers.ticket_create = async (req, res) => {
  const { ticketName, ticketDescript, ticketData, ticketPriority, idBuyer, idTicketStatus, idTicketDepartment, idManager } = req.body;
  const ticket = await Ticket.create({
    ticketName, ticketDescript, ticketData, ticketPriority, idBuyer, idTicketStatus, idTicketDepartment, idManager
  });
  res.json(ticket);
};

// Example from your provided code snippet
controllers.ticket_update = async (req, res) => {
  const idReceived = req.params.id;
  const { ticketName, ticketDescript, ticketDate, ticketPriority, idTicketStatus, idTicketDepartment } = req.body;

  try {
      const updatedTicket = await Ticket.update(
          { ticketName, ticketDescript, ticketDate, ticketPriority, idTicketStatus, idTicketDepartment },
          { where: { idTicket: idReceived } }
      );

      res.json({ success: true, updatedTicket });
  } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ success: false, error: 'Failed to update ticket' });
  }
};


controllers.ticket_detail = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Ticket.findOne({ where: { idTicket: idReceived } });
  res.json(data);
};

controllers.ticket_findByBuyer = async (req, res) => {
  let idReceived = req.params.id;

  const data = await Ticket.findAll({ where: { idBuyer: idReceived }, include: [
    { model: Buyer, as: 'buyer' },
    { model: TicketStatus, as: 'ticketStatus' },
    { model: TicketDepartment, as: 'ticketDepartment' },
    { model: Manager, as: 'manager' }
  ] });

  res.json(data);
};

controllers.ticket_findByTicketStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Ticket.count({ where: { idTicketStatus: id } });
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error counting tickets by status:', error);
    res.status(500).json({ success: false, message: 'Error counting tickets by status', error: error.message });
  }
};

controllers.ticket_delete = async (req, res) => {
  let idReceived = req.params.id;
  await Ticket.destroy({ where: { id: idReceived } });
  res.json({ message: "Excluído com sucesso!" });
};

module.exports = controllers;
