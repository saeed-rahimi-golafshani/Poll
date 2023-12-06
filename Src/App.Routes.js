const { AuthRoutes } = require("./Modules/Auth/Auth.Routes");
const router = require("express").Router();

router.use("/auth", AuthRoutes);

module.exports = {
    MainRouter: router
}