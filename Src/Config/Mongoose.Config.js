
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function dataBase_Config(){
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connect To Db...");
    }).catch(err => {
        console.log(err?.message ?? "Feild Db Connection...");
    })
}

module.exports = dataBase_Config