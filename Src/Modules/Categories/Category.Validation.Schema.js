const createHttpError = require("http-errors");
const joi = require("joi");
const CategoryMessage = require("./Category.Message");
const { MONGOID_PATTERN } = require("../../Common/Constant/Constant");

const createCategorySchema = joi.object({
    title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest(CategoryMessage.CategoryTitleValidation)),
    slug: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest(CategoryMessage.CategorySlugValidation)),
    icon: joi.string().trim().error(createHttpError.BadRequest(CategoryMessage.CategorySlugValidation)),
    showInArchive: joi.boolean().error(createHttpError.BadRequest(CategoryMessage.CategoryUndefindValidation)),
    parent: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest(CategoryMessage.CategoryUndefindValidation))
});

module.exports = createCategorySchema