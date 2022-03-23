require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET || "Consum2022", //secuencia de encriptación

    expires: process.env.AUTH_EXPIRES || "48h",//caducidad del token

    rounds: process.env.AUTH_ROUNDS || 10 //ciclos de encriptado

}
