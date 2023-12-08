const autoBind = require("auto-bind");
const UserService = require("./User.Service");

class UserController{
    #service
    constructor(){
        autoBind(this);
        this.#service = UserService
    }
    async profile(req, res, next){
        try {
            const user = req.user;
            return res.json(user)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController()