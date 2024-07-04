const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.admin_list); 

router.get("/LoginAdmin", adminController.admin_login);

router.post("/create", adminController.admin_create);

router.put("/update/:id", adminController.admin_update);

router.get("/:id", adminController.admin_detail); 

router.delete("/delete/:id", adminController.admin_delete);

module.exports = router;