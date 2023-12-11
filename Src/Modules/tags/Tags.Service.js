const autoBind = require("auto-bind");
const TagsModel = require("./Tags.Model");
const slugify = require("slugify");
const { alreadyExistByTilte, alreadyExistBySlug } = require("../../Common/Constant/Public.Function");

class TagsService{
    #model
    constructor(){
        autoBind(this);
        this.#model = TagsModel
    }
    async createTags(TagsDto){
        await alreadyExistByTilte(TagsDto.title, this.#model);
        if(TagsDto?.slug){
            TagsDto.slug = slugify(TagsDto);
            await alreadyExistBySlug(TagsDto.slug, this.#model);
        } else {
            TagsDto.slug = slugify(TagsDto.title)
        }
        TagsDto.meta_title = TagsDto.title;
        const tags = await this.#model.create(TagsDto);
        return tags
    }
    
}

module.exports = new TagsService();