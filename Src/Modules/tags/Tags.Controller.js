const autoBind = require("auto-bind");
const createTagsSchema = require("./Tags.Validation.Schema");
const TagsService = require("./Tags.Service");
const { StatusCodes: httpStatus } = require("http-status-codes");
const TagsMessage = require("./Tags.Message");

class TagsControoler{
    #service
    constructor(){
        autoBind(this);
        this.#service = TagsService
    }
    async createTags(req, res, next){
        try {
            const requestBody = await createTagsSchema.validateAsync(req.body);
            const { title, slug, content } = requestBody;
            await this.#service.createTags({ title, slug, content });
            return res.status(httpStatus.CREATED).json({
                message: TagsMessage.CreateTags
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TagsControoler();