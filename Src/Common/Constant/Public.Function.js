const momentMJ = require("moment-jalali");

function convertGregorianDateToPersionDateToToday(){ 
    const date = new Date();
    return momentMJ(date).format('jYYYY-jMM-jDD HH:mm:ss');
};

module.exports = {
    convertGregorianDateToPersionDateToToday
}
