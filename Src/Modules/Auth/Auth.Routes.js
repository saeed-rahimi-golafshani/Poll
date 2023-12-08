const Authorization = require("../../Common/Guard/Authorization.Guard");
const { AuthController } = require("./Auth.Controller");
const router = require("express").Router();

router.post("/send_otp", AuthController.sendOtp);
router.post("/check_otp", AuthController.checkOtp);
router.get("/logout", Authorization, AuthController.logOut)

module.exports = {
    AuthRoutes: router
}