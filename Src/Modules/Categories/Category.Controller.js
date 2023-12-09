const autoBind = require("auto-bind");
const CategoryService = require("./Category.Service");
const createCategorySchema = require("./Category.Validation.Schema");
const { StatusCodes: httpStatus} = require("http-status-codes");
const CategoryMessage = require("./Category.Message");

class CategoryController{
    #service
    constructor(){
        autoBind(this);
        this.#service = CategoryService
    };
    async createCategory(req, res, next){
        try {
            const requestBody = await createCategorySchema.validateAsync(req.body);
            const { title, slug, icon, showInArchive, parent } = requestBody;
            await this.#service.createCategory({title, slug, icon, showInArchive, parent});
            return res.status(httpStatus.CREATED).json({
                message: CategoryMessage.CreateCategory
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfCategory(req, res, next){
        try {
            const categories = await this.#service.listOfCategory();
            return res.json(categories)
        } catch (error) {
            next(error)
        }
    }
};

module.exports = new CategoryController()