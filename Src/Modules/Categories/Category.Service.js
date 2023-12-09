const autoBind = require("auto-bind");
const CategoryModel = require("./Category.Model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const CategoryMessage = require("./Category.Message");
const { default: slugify } = require("slugify");
const { convertGregorianDateToPersionDateToToday } = require("../../Common/Constant/Public.Function");

class CategoryService{
    #model
    constructor(){
        autoBind(this);
        this.#model = CategoryModel
    }
    async createCategory(categoryDto){
        await this.alreadyExistByTilte(categoryDto.title);
        if(categoryDto?.parent && isValidObjectId(categoryDto.parent)){
            const existCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existCategory._id;
            categoryDto.parents = [
                ... new Set(
                    ([existCategory._id.toString()].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if(categoryDto?.slug){
            categoryDto.slug = slugify(categoryDto.slug)
            await this.alreadyExistBySlug(categoryDto.slug);
        } else {
            categoryDto.slug = slugify(categoryDto.title)
        }
        const craeteTime = convertGregorianDateToPersionDateToToday();
        const updateTime = convertGregorianDateToPersionDateToToday();
        categoryDto.createdAt = craeteTime;
        categoryDto.updatedAt = updateTime;
        const category = await this.#model.create(categoryDto)
        return category

    };
    async listOfCategory(){
        return await this.#model.find({parent: {$exists: false}});
    };
    async checkExistById(id){
        const category = await this.#model.findById(id);
        if(!category) throw new createHttpError.NotFound(CategoryMessage.CategoryNotFound);
        return category
    };
    async existBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(!category) throw new createHttpError.NotFound(CategoryMessage.CategoryNotFound);
        return category
    };
    async alreadyExistByTilte(title){
        const category = await this.#model.findOne({title});
        if(category) throw new createHttpError.Conflict(CategoryMessage.CategoryAlreadyExist);
        return category
        
    };
    async alreadyExistBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(category) throw new createHttpError.Conflict(CategoryMessage.CategoryAlreadyExist);
        return category
        
        
    }
};

module.exports = new CategoryService()