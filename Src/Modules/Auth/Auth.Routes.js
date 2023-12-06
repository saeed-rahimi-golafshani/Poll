const { AuthController } = require("./Auth.Controller");
const router = require("express").Router();

router.post("/send_otp", AuthController.sendOtp);

module.exports = {
    AuthRoutes: router
}