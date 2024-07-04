const express = require("express");
const router = express.Router();

const managerLicenseController = require("../controllers/ManagerLicenseController");

router.get("/", managerLicenseController.ManagerLicense_list); 

router.post("/create", managerLicenseController.ManagerLicense_create);

router.put("/update/:id", managerLicenseController.ManagerLicense_update);

router.get("/:id",  managerLicenseController.ManagerLicense_detail); 

router.delete("/delete/:id", managerLicenseController.ManagerLicense_delete);

module.exports = router;