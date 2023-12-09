const Authorization = require("./Common/Guard/Authorization.Guard");
const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");
const { CategoryRoutes } = require("./Modules/Categories/Category.Routes");
const { UserRoutes } = require("./Modules/Users/User.Routes");
const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/user", Authorization, UserRoutes);
router.use("/category", CategoryRoutes);
module.exports = {
    MainRouter: router
}