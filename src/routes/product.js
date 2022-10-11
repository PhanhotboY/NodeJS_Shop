const express = require("express");
const productRoute = express.Router();

const productController = require("../app/controllers/productController");

productRoute.get("/all", productController.all);

module.exports = productRoute;
