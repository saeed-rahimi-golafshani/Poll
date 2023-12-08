const { Router } = require("express");
const UserController = require("./User.Controller");

const router = Router();
router.get("/", UserController.profile);

module.exports = {
    UserRoutes: router
}