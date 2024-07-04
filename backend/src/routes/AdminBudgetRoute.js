const express = require("express");
const router = express.Router();

const adminBudgetController = require("../controllers/AdminBudgetController");

router.get("/", adminBudgetController.adminBudget_list); 

router.post("/create", adminBudgetController.adminBudget_create);

router.put("/update/:id", adminBudgetController.adminBudget_update);

router.get("/:id", adminBudgetController.adminBudget_detail); 

router.delete("/delete/:id", adminBudgetController.adminBudget_delete);

module.exports = router;