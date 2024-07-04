const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.ticket_list); 

router.get("/findByBuyer/:id", ticketController.ticket_findByBuyer); 

router.post("/create", ticketController.ticket_create);

router.put("/update/:id", ticketController.ticket_update);

router.get("/:id", ticketController.ticket_detail); 

router.get('/status/:id', ticketController.ticket_findByTicketStatus);

router.delete("/delete/:id", ticketController.ticket_delete);

module.exports = router;