const createHttpError = require("http-errors");
const momentMJ = require("moment-jalali");
const PublicMessage = require("./Public.Message");

function convertGregorianDateToPersionDateToToday(){ 
    const date = new Date();
    return momentMJ(date).format('jYYYY-jMM-jDD HH:mm:ss');
};
async function alreadyExistByTilte(title, modelSchema){
    const model = await modelSchema.findOne({title});
    if(model) throw new createHttpError.Conflict(PublicMessage.alreadyExistTitle);
    return model
}
async function alreadyExistBySlug(slug, modelSchema){
    const model = await modelSchema.findOne({slug});
    if(model) throw new createHttpError.Conflict(PublicMessage.alreadyExistTitle);
    return model
}

module.exports = {
    convertGregorianDateToPersionDateToToday,
    alreadyExistByTilte,
    alreadyExistBySlug
}
