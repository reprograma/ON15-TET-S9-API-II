const dbConfig = require("../models/dbConfig");

async function dbConfigConnect() {
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request, response) => {
    let seriesJson = await dbConfigConnect()
    response.status(200).send(seriesJson)

}
const getById = async(request, response) => {
    let seriesJson = await dbConfigConnect()
    let idRequest = request.params.id
    let seriesEncontradas = seriesJson.find(filme => filme.id == idRequest)
    response.status(200).send(seriesEncontradas)
}
const createMovie = async(request, response) => {
    let seriesJson = await dbConfigConnect()

    let bodyRequest = request.body

    let novaSerie = {
        id: (seriesJson.length) + 1,
        title: bodyRequest.title,
        genre: bodyRequest.genre
    }
    seriesJson.push(novaSerie)

    response.status(201).send({
        "mensagem": "Série cadastrada com sucesso",
        novaSerie
    })
}
module.exports = {
    getAll,
    getById,
    createMovie
}