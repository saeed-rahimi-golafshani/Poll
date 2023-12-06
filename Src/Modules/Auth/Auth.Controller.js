const autoBind = require("auto-bind");
const { sendOtpSchema } = require("./Auth.Validation.Schema");
const { AuthService } = require("./Auth.Service");
const AuthMessage = require("./Auth.Message");

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
            await this.#service.sendotp(mobile);
            return res.json({
                message: AuthMessage.sendOtpSuccessfuly
            })
            
        } catch (error) {
            next(error)
        }
    };
    
}

module.exports = {
    AuthController: new AuthController()
}