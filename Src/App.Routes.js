const Authorization = require("./Common/Guard/Authorization.Guard");
const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");
const { UserRoutes } = require("./Modules/Users/User.Routes");
const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/user", Authorization, UserRoutes);

module.exports = {
    MainRouter: router
}