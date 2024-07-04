const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.category_list); 

router.post("/create", categoryController.category_create);

router.put("/update/:id", categoryController.category_update);

router.get("/:id", categoryController.category_detail); 

router.delete("/delete/:id", categoryController.category_delete);

module.exports = router;