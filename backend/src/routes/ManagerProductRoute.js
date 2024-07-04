const express = require('express');
const router = express.Router();

const managerProductController = require('../controllers/ManagerProductController');

// Rota para buscar todos os registros de ManagerProduct
router.get('/', managerProductController.getAllManagerProducts);

// Rota para criar um novo registro de ManagerProduct
router.post('/create', managerProductController.createManagerProduct);

// Rota para buscar um registro de ManagerProduct por ID
router.get('/getById/:id', managerProductController.getManagerProductById);

// Rota para atualizar um registro de ManagerProduct por ID
router.put('/update/:id', managerProductController.updateManagerProduct);

// Rota para deletar um registro de ManagerProduct por ID
router.delete('/delete/:id', managerProductController.deleteManagerProduct);

module.exports = router;
