const dbConfig = require("../models/dbConfig")

async function dbConnect() {
    return await dbConfig.bancoDeDados("assistir")
}
const getMessage = async (request, response) => {
    let mensagem = await dbConnect()
    response.status(200).send(mensagem)
    
}

module.exports = {
    getMessage
}