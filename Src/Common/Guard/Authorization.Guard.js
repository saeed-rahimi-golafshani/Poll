const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { AuthorizationGuradMessage } = require("../Messages/Auth.Guard.Message");
const { UserModel } = require("../../Modules/Users/UserModel");
require("dotenv").config();

const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if(!token) throw new createHttpError.Unauthorized(AuthorizationGuradMessage.Login)
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(typeof data === "object" && "id" in data){
            const user = await UserModel.findById(data.id, {__v: 0, updatedAt: 0, Phone_verification: 0, access_profile: 0, email_verification: 0, createdAt: 0}).lean();
            if(!user) throw new createHttpError.Unauthorized(AuthorizationGuradMessage.NotFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationGuradMessage.InvalidToken)
    } catch (error) {
        next(error)
    }
};

module.exports = Authorization