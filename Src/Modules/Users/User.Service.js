const autoBind = require("auto-bind");
const { UserModel } = require("./UserModel");

class UserService{
    #model
    constructor(){
        autoBind(this);
        this.#model = UserModel
    }
}

module.exports = new UserService()