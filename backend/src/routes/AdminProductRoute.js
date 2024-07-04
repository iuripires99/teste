const express = require("express");
const router = express.Router();

const adminProductController = require("../controllers/AdminProductController");

router.get("/", adminProductController.adminProduct_list); 

router.post("/create", adminProductController.adminProduct_create);

router.put("/update/:id", adminProductController.adminProduct_update);

router.get("/:id", adminProductController.adminProduct_detail); 

router.delete("/delete/:id", adminProductController.adminProduct_delete);

module.exports = router;