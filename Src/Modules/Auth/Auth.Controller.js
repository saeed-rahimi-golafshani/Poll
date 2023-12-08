const autoBind = require("auto-bind");
const { sendOtpSchema, checkOtpSchema } = require("./Auth.Validation.Schema");
const { AuthService } = require("./Auth.Service");
const AuthMessage = require("./Auth.Message");
const Node_Env = require("../../Common/Constant/Env.enum");

class AuthController{
    #service
    constructor(){
        autoBind(this);
        this.#service = AuthService
    }
    async sendOtp(req, res, next){
        try {
            const requestBody = await sendOtpSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            await this.#service.sendOtp(mobile);
            return res.json({
                message: AuthMessage.sendOtpSuccessfuly
            })
            
        } catch (error) {
            next(error)
        }
    };
    async checkOtp(req, res, next){
        try {
            const requestBody = await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = requestBody;
            const token = await this.#service.checkOtp(mobile, code);
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === Node_Env
            }).status(200).json({
                message: AuthMessage.LogingSuccessFully,
                token
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = {
    AuthController: new AuthController()
}