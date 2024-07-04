const express = require("express");
const router = express.Router();

const licenseStatusController = require("../controllers/licenseStatusController");

router.get("/", licenseStatusController.licenseStatus_list); 

router.post("/create", licenseStatusController.licenseStatus_create);

router.put("/update/:id", licenseStatusController.licenseStatus_update);

router.get("/:id", licenseStatusController.licenseStatus_detail); 

router.delete("/delete/:id", licenseStatusController.licenseStatus_delete);

module.exports = router;