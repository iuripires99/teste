const express = require("express");
const router = express.Router();

const adminDepartmentController = require("../controllers/adminDepartmentController");

router.get("/", adminDepartmentController.admin_department_list); 

router.post("/create", adminDepartmentController.admin_department_create);

router.put("/update/:id", adminDepartmentController.admin_department_update);

router.get("/:id", adminDepartmentController.admin_department_detail); 

router.delete("/delete/:id", adminDepartmentController.admin_department_delete);

module.exports = router; 