const express = require("express");
const dotenv = require("dotenv");
const dataBase_Config = require("./Src/Config/Mongoose.Config");
const notFoundHandler = require("./Src/Common/Exception/notFound.Handler");
const allExceptionHandler = require("./Src/Common/Exception/All_Exception.Handler")
const { MainRouter } = require("./Src/App.Routes");
const cookieParser = require("cookie-parser");


dotenv.config();
async function main(){
    const app = express();
    const port = process.env.PORT;
    const baseUrl = process.env.BASEURL;
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser(process.env.TOKEN_SECRET_KEY));
    dataBase_Config();
    app.use(MainRouter)
    notFoundHandler(app);
    allExceptionHandler(app)

    app.listen(port, () => {
        console.log(`Server: ${baseUrl}:${port}`);
    });
};

main()