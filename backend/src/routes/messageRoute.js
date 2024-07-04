const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/", messageController.message_list); 

router.post("/create", messageController.message_create);

router.put("/update/:id", messageController.message_update);

router.get("/:id", messageController.message_detail); 

router.delete("/delete/:id", messageController.message_delete);

module.exports = router;