const { Router } = require("express");
const CategoryController = require("./Category.Controller");

const router = Router();
router.post("/", CategoryController.createCategory);
router.get("/list", CategoryController.listOfCategory);

module.exports = {
    CategoryRoutes: router
}