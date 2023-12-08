const { AuthController } = require("./Auth.Controller");
const router = require("express").Router();

router.post("/send_otp", AuthController.sendOtp);
router.post("/check_otp", AuthController.checkOtp);

module.exports = {
    AuthRoutes: router
}