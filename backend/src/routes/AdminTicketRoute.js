const express = require("express");
const router = express.Router();

const adminTicketController = require("../controllers/AdminTicketController");

router.get("/", adminTicketController.adminTicket_list); 

router.post("/create", adminTicketController.adminTicket_create);

router.put("/update/:id", adminTicketController.adminTicket_update);

router.get("/:id", adminTicketController.adminTicket_detail); 

router.delete("/delete/:id", adminTicketController.adminTicket_delete);

module.exports = router;