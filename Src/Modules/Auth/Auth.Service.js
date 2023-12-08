const autoBind = require("auto-bind");
const { UserModel } = require("../Users/UserModel");
const { randomInt } = require("crypto");
const { convertGregorianDateToPersionDateToToday } = require("../../Common/Constant/Public.Function");
const { ActivationModel } = require("./ActivationModel");
const createHttpError = require("http-errors");
const AuthMessage = require("./Auth.Message");
const jwt = require("jsonwebtoken");
require("dotenv").config();


class AuthService{
    #model
    #ActivationModel
    constructor(){
        autoBind(this);
        this.#model = UserModel;
        this.#ActivationModel = ActivationModel
   }
    async sendOtp(mobile){
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
    async checkOtp(mobile, code){
        const user = await this.checkExistUserByMobile(mobile);
        const userActivation = await this.#ActivationModel.findOne({userId: user._id});
        const now = new Date().getTime();
        if(userActivation?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
        if(userActivation?.otp?.code != code) throw new createHttpError.Unauthorized(AuthMessage.otpCodeIsNotIncorrect);
        if(!user.Phone_verification){
            user.Phone_verification = true
        };
        const accessToken = this.signToken({mobile, id: user._id});
        return accessToken
    };
    async checkExistUserByMobile(mobile){
        const user = await this.#model.findOne({mobile});
        if(!user) throw new createHttpError.NotFound(AuthMessage.AuthNotFound);
        return user
    };
    signToken(payload){
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRESIN_TIME})
    }
}

module.exports = {
    AuthService: new AuthService()
}