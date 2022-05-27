
const dbConfig = require("../models/dbConfig.js")


async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}


const getAll = async (request, response) =>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

const getById = async (request, response)=>{

    let seriesJson = await dbConnect()

    let idRequest = request.params.id
    let serieEncontrado = seriesJson.find(serie => serie .id == idRequest)

    response.status(200).send(serieEncontrado)
}

const searchTitle = async (request, response) => {
    let seriesJson = await dbConnect()
    let tituloRequest = request.query.title.toLowerCase()

    let serieEncontrado = seriesJson.filter(
    serie  => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrado)

}


const searchGenre = async (request, response) => {
    let seriesJson = await dbConnect()
    let generoRequest = request.query.genre.toLowerCase()

    let serieEncontrado = seriesJson.filter(
    serie => serie.genre.toString().toLowerCase().includes(generoRequest))

    response.status(200).send(serieEncontrado)

}

const createMovie = async (request, response) => {
    let seriesJson = await dbConnect()

    let bodyRequest  = request.body

    let novaSerie = {

        "id":bodyRequest.id,
        "title": bodyRequest.title,
        "totalSeasons":bodyRequest.totalSeasons,
        "genre": bodyRequest.genre,
        "writers":bodyRequest.writers,
        "poster": bodyRequest.poster,
        "actors": bodyRequest.actors,
        "ratings":bodyRequest.ratings

    }

    seriesJson.push(novaSerie)

    response.status(201).send({
        "mensagem": "Series cadastradas",
        novaSerie
    })
}

const replaceById = async(request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const bodyRequest = request.body

    const serieEncontrado = seriesJson.find(serie  => serie .id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrado)

    bodyRequest.id = idRequest

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "Serie finalizada",
        "filme-atualizado": bodyRequest,
        seriesJson
    }])
}


const updateTitle = async (request, response) => {
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.title

    const serieEncontrado = seriesJson.find(serie  => serie .id == idRequest)


    serieEncontrado.title = newTitle

    response.status(200).json([{
        "mensagem": "Serie atualizada",
        "filme-atualizado": serieEncontrado,
        seriesJson
    }])
}


const updateActors = async (request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const newGenre = request.body.Genre

    const serieEncontrado = seriesJson.find(serie  => serie.id == idRequest)

    serieEncontrado.Genre = newGenre

    response.status(200).json([{
        "mensagem": "Serie atualizada",
        "filme-atualizado": serieEncontrado,
        seriesJson
    }])
}

const excluir = async(request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const serieEncontrado = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrado)

    seriesJson.splice(indice, 1)

    response.status(200). json([{
        "mensagem": "Serie deletada",
        "filme-deletado" : serieEncontrado,
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
    excluir

}