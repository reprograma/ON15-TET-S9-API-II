//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//getAll retorna todos os series
const getAll = async (request, response) =>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

const getById = async (request, response)=>{
    //conecta no banco de dados
    let seriesJson = await dbConnect()

    let idRequest = request.params.id //peguei o id enviado na request
    let seriesEncontrado = seriesJson.find(series => series.id == idRequest)

    response.status(200).send(seriesEncontrado)
}

const createMovie = async(request, response)=>{
    let seriesJson = await dbConnect()

    let bodyRequest = request.body

    let novoSerie = {
        id: (seriesJson.length)+1, 
        title: bodyRequest.title, 
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre, 
        writers: bodyRequest.writers,
        poster: bodyRequest.poster, 
        actors: bodyRequest.actors, 
        ratings: bodyRequest.ratings,
        rating: bodyRequest.rating,  
        likes: bodyRequest.likes   
    }
    seriesJson.push(novoSerie)
    
    response.status(201).send({
        "mensagem": "Serie cadastrada com sucesso",
        novoSerie
    })
}

module.exports = {
    getAll,
    getById,
    createMovie
}