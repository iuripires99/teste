const express = require("express");
const router = express.Router();

const cartProductController = require("../controllers/CartProductController");

router.get("/", cartProductController.CartProduct_list); 

router.post("/create", cartProductController.CartProduct_create);

router.put("/update/:id", cartProductController.CartProduct_update);

router.get("/:id", cartProductController.CartProduct_detail); 

router.delete("/delete/:id", cartProductController.CartProduct_delete);

module.exports = router;