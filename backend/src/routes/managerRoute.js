const express = require("express");
const router = express.Router();

const managerController = require("../controllers/managerController");

router.get("/", managerController.manager_list); 

router.get("/findByBuyer/:id", managerController.manager_findByBuyer); 

router.get("/ManagerAdmin", managerController.manager_login);

router.post("/create", managerController.manager_create);

router.put("/update/:id", managerController.manager_update);

router.get("/:id", managerController.manager_detail); 

router.post("/delete/:id", managerController.manager_delete);

module.exports = router;