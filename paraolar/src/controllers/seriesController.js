const dbConfig = require("../models/dbConfig.js")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async (request, response)=>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

const getById = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    response.status(200).send(serieEncontrada)
}

const searchTitle = async (request, response)=>{
    let seriesJson = await dbConnect()
    let titleRequest = request.query.title.toLowerCase()
    let serieEncontrada = seriesJson.filter(
        serie => serie.title.toLowerCase().includes(titleRequest))

   response.status(200).send(serieEncontrada)     
}

const searchGenre = async (request, response)=>{
    let seriesJson = await dbConnect()
    let genreRequest = request.query.genre.toLowerCase()
    let serieEncontrada = seriesJson.filter(
        serie => serie.genre.toString().toLowerCase().includes(genreRequest))

    response.status(200).send(serieEncontrada)
}

const createMovie = async (request,response)=>{
    let seriesJson = await dbConnect()
    let bodyRequest = request.body
    let novaSerie = {
        "id": bodyRequest.id,
        "title": bodyRequest.title,
        "totalSeasons": bodyRequest.totalSeasons,
        "genre": bodyRequest.genre,
        "writers": bodyRequest.writers,
        "poster": bodyRequest.poster,
        "actors": bodyRequest.actors,
        "ratings": bodyRequest.ratings
    }

    seriesJson.push(novaSerie)

    response.status(200).send({
        "Mensagem": "Filmes cadastrados com sucesso",
        novaSerie
    })
}

const replaceById = async (request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const bodyRequest = request.body
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    const indice = seriesJson.indexOf(serieEncontrada)

    bodyRequest.id = idRequest

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "Mensagem": "Filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        seriesJson
    }])
}

const updateTitle = async (request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const newTitle = request.body.title
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    serieEncontrada.title = newTitle

    response.status(200).json([{
        "Mensagem": "Filme atualizado com sucesso",
        "filme-atualizado": serieEncontrada,
        seriesJson
    }])
}

const updateActors = async (request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const newGenre = request.body.genre
    const serieEncontrada = seriesJson.find(serie =>serie.id == idRequest)

    serieEncontrada.Genre = newGenre

    response.status(200).json([{
        "Mensagem": "Filme atualizado com sucesso",
        "filme-atualizado": serieEncontrada,
        seriesJson
    }])
}

const deletar = async (request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    const indice = seriesJson.indexOf(serieEncontrada)

    seriesJson.splice(indice, 1)

    response.status(200).json([{
        "Mensagem": "Filme deletado com sucesso",
        "filme-deletado": serieEncontrada,
        seriesJson
    }])
}

module.exports = {
    getAll,
    getById,
    searchTitle,
    searchGenre,
    createMovie,
    replaceById,
    updateTitle,
    updateActors,
    deletar
}