const autoBind = require("auto-bind");
const { UserModel } = require("../Users/UserModel");
const { randomInt } = require("crypto");
const { convertGregorianDateToPersionDateToToday } = require("../../Common/Constant/Public.Function");
const { ActivationModel } = require("./ActivationModel");
const createHttpError = require("http-errors");
const AuthMessage = require("./Auth.Message");


class AuthService{
    #model
    #ActivationModel
    constructor(){
        autoBind(this);
        this.#model = UserModel;
        this.#ActivationModel = ActivationModel
   }
    async sendotp(mobile){
        const user = await this.#model.findOne({mobile});
        const createTime = convertGregorianDateToPersionDateToToday();
        const updateTime = convertGregorianDateToPersionDateToToday();
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000*60*2)
        };
        if(!user){
            const newUser = await this.#model.create(
                {
                    mobile,
                    createdAt: createTime,
                    updateTime: updateTime
                });
            await this.#ActivationModel.create({
                userId: newUser._id,
                otp,
                createdAt: createTime,
                updatedAt: updateTime 
            });
            return newUser
        }
        const userActivation = await this.#ActivationModel.findOne({userId: user._id});
        if(userActivation.otp && userActivation.otp.expiresIn > now){
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        }
        userActivation.otp = otp;
        userActivation.updatedAt = updateTime;
        await userActivation.save();
        await user.save();
        return user
    };
}

module.exports = {
    AuthService: new AuthService()
}