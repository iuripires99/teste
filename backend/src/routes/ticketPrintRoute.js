const express = require("express");
const router = express.Router();

const ticketPrintController = require("../controllers/ticketPrintController");

router.get("/", ticketPrintController.ticketPrint_list); 

router.post("/create", ticketPrintController.ticketPrint_create);

router.put("/update/:id", ticketPrintController.ticketPrint_update);

router.get("/:id", ticketPrintController.ticketPrint_detail); 

router.delete("/delete/:id", ticketPrintController.ticketPrint_delete);

module.exports = router;