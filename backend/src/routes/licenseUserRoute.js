const express = require("express");
const router = express.Router();

const licenseUserController = require("../controllers/licenseUserController");

router.get("/", licenseUserController.licenseUser_list);  

router.post("/create", licenseUserController.licenseUser_create);

router.put("/update/:id", licenseUserController.licenseUser_update);

router.get("/:id", licenseUserController.licenseUser_detail); 

router.delete("/delete/:id", licenseUserController.licenseUser_delete);

module.exports = router;