const dbConfig = require("../models/dbConfig")

async function dbConfigConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response) => {
    let filmesJson = await dbConfigConnect()
    response.status(200).send(filmesJson)
}
module.exports = {
    getAll
}