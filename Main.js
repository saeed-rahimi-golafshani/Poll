const express = require("express");
const dotenv = require("dotenv");
const dataBase_Config = require("./Src/Config/Mongoose.Config");
const notFoundHandler = require("./Src/Common/Exception/notFound.Handler");

dotenv.config();
async function main(){
    const app = express();
    const port = process.env.PORT;
    const baseUrl = process.env.BASEURL;
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    dataBase_Config();
    notFoundHandler(app);
    allExceptionHandler(app)

    app.listen(port, () => {
        console.log(`Server: ${baseUrl}:${port}`);
    });
};

main()