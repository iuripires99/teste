const express = require('express');
const router = express.Router();

const budgetProductController = require('../controllers/BudgetProductController');

router.post('/budgetProducts', budgetProductController.create);

router.get('/budgetProducts', budgetProductController.getAll);

router.get('/budgetProducts/:id', budgetProductController.getById);

router.put('/budgetProducts/:id', budgetProductController.update);

router.delete('/budgetProducts/:id', budgetProductController.delete);

module.exports = router;