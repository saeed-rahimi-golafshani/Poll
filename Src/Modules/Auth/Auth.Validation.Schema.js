const joi = require("joi");
const { MOBILE_PATTERN } = require("../../Common/Constant/Constant");
const createHttpError = require("http-errors");
const AuthMessage = require("./Auth.Message");

const sendOtpSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest(AuthMessage.AuthMobileValidation))
});
const checkOtpSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest(AuthMessage.AuthMobileValidation)),
    code: joi.string().trim().min(4).max(6).error(createHttpError.BadRequest(AuthMessage.AuthCodeValidation))
});

module.exports = {
    sendOtpSchema,
    checkOtpSchema
}