const express = require("express");
const router = express.Router();

module.exports = router;

const budgetController = require("../controllers/budgetController");

router.get("/", budgetController.budget_list); 

router.get("/:id", budgetController.budget_detail);

router.get("/findByCart/:id", budgetController.budget_findByCart); 

router.post("/create", budgetController.budget_create);

router.put("/update/:id", budgetController.budget_update);

router.get('/countByStatus/:id', budgetController.budget_findByBudgetStatus);

router.delete("/delete/:id", budgetController.budget_delete);

module.exports = router;