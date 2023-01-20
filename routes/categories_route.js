const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category_controller");

router.get("/all", categoryController.getAllProduct);
router.get("/all/:id", categoryController.getAllByIdProduct);
router.post("/create", categoryController.createProduct);
router.patch("/update/:id", categoryController.updateProduct);
router.delete("/delete/:id", categoryController.deleteProduct);

module.exports = router;
