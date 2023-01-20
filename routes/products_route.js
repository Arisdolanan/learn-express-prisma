const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller");

router.get("/all", productController.getAllProduct);
router.get("/all/:id", productController.getAllByIdProduct);
router.post("/create", productController.createProduct);
router.patch("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
