const dbConfig = require("../models/dbConfig")


async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request,response) =>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

const getByID = async(request,response) =>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    response.status(200).send(serieEncontrada)
}

const getByTitle = async (request, response) => {
    let seriesJson = await dbConnect()
    let tituloRequest = request.query.titulo.toLowerCase()

    let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)

}

const createSerie = async (request, response) => {
    let seriesJson = await dbConnect()
    let bodyRequest = request.body

    let novaSerie = {
        id: (seriesJson.length) + 1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: bodyRequest.ratings

    }

    seriesJson.push(novaSerie)
    response.status(201).send({
        "mensagem": "Série cadastrada com sucesso",
        novaSerie
    })

}

const deleteByID = async (request, response) => {
    let seriesJson = await dbConnect()

    let idRequest = request.params.id
    let indexOfSerie = seriesJson.findIndex(item => item.id == idRequest)

    let serieRemovida = seriesJson.splice(indexOfSerie, 1)
    response.status(200).send({
        "mensagem": "Filme removido com sucesso",
        "filme-deletado": serieRemovida,

        seriesJson

    })
}

const updateAll = async (request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const bodyRequest = request.body

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrada)

    bodyRequest.id = idRequest

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "Série atualizada com sucesso",
        "serie-atualizada": bodyRequest,
        seriesJson
    }])
}

const updateTitle = async (request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const newTitle = request.body.title

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    serieEncontrada.title = newTitle

    response.status(200).json([{
        "mensagem": "Título atualizado com sucesso",
        "serie-atualizada": serieEncontrada,
        seriesJson
    }])
}
module.exports = {
    getAll,
    getByID,
    getByTitle,
    createSerie,
    deleteByID,
    updateAll,
    updateTitle
}
