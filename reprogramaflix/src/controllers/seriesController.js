//chamar o banco de dados
const dbConfig = require("../models/dbConfig")

//conectando a dbConfig
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//getAll retorna todos os filmes
const getAll = async (request, response) => {
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

const getById = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id 
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    response.status(200).send(serieEncontrada)
}

const creatMovie = async (request, response) => {
    let seriesJson = await dbConnect()

    let bodyRequest = request.body

    let novaSerie = {
        "id": (seriesJson.length)+1,
        "title": seriesJson.title,
        "totalSeasons": seriesJson.totalSeasons,
        "genre": seriesJson.genre,
        "writers": seriesJson.writers,
        "poster": seriesJson.poster,
        "actors": seriesJson.actors,
        "ratings": seriesJson.ratings
    }
}

module.exports = {
    getAll,
    getById,
    creatMovie
}