const joi = require("joi");
const TagsMessage = require("./Tags.Message");

const createTagsSchema = joi.object({
    title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest(TagsMessage.tagsTitleValidation)),
    slug: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest(TagsMessage.tagsSlugValidation)),
    content: joi.string().trim().error(createHttpError.BadRequest(TagsMessage.tagsContentValidation)) 
});

module.exports = createTagsSchema