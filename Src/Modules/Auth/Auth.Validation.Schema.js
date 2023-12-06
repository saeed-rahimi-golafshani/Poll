const joi = require("joi");
const { MOBILE_PATTERN } = require("../../Common/Constant/Constant");
const createHttpError = require("http-errors");
const AuthMessage = require("./Auth.Message");

const sendOtpSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest(AuthMessage.AuthValidation))
});

module.exports = {
    sendOtpSchema
}