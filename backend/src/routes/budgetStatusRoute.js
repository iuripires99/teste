const express = require("express");
const router = express.Router();

module.exports = router;

const budgetStatusController = require("../controllers/budgetStatusController");

router.get("/", budgetStatusController.budgetStatus_list); 

router.get("/:id", budgetStatusController.budgetStatus_detail);

router.post("/create", budgetStatusController.budgetStatus_create);

router.put("/update/:id", budgetStatusController.budgetStatus_update);

router.delete("/delete/:id", budgetStatusController.budgetStatus_delete);

module.exports = router;