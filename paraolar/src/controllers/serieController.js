//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//getAll retorna todos os series
const getAll = async (request, response) =>{
    try {
    let seriesJson = await dbConnect()
    response.status(200).json(seriesJson)
    }catch(error){
        response.satus(400).json("message", error.message)}

    }



const getById = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(series=>series.id == getById)
    
    if(!filmeEncontrado) {
        throw Error ("sperie não encontrada erro")
    }
    
     response.status(200).send(serieEncontrada)

}



const searchTitle = async (request, response) => {
    let seriesJson = await dbConnect()
    let tituloRequest = request.query.title.toLowerCase()

    let serieEncontrada = seriesJson.filter(
    serie => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)

}



const searchGenre = async (request, response) => {
    let seriesJson = await dbConnect()
    let tituloRequest = request.query.Genre.toLowerCase()

    let serieEncontrada = seriesJson.filter(
    serie => serie.Genre.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)

}


const createSerie = async(request, response) => {
    let seriesJson = await dbConnect()

    let bodyRequest = request.body

    let novaSerie = {

        "id": bodyRequest.id, 
        "title":bodyRequest.Title,
        "totalSeasons":bodyRequest.totalSeasons,
        "genre": bodyRequest.genre,  
        "writers": bodyRequest.writers,  
        "poster": bodyRequest.poster,  
        "actors": bodyRequest.actors,
        "ratings": bodyRequest.ratings,  
            "rating":bodyRequest.rating,
            "likes": bodyRequest.likes,
       
    }
    seriesJson.push(novaSerie)

    resposta.status(201).send({
        "mensagem" : "série cadastrada com sucesso",
        novaSerie
    })
}

const replaceById = async(request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const bodyRequest = request.body

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrada)

    bodyRequest.id = idRequest

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "série atualizada com sucesso",
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
        "mensagem": "serie atualizada com sucesso",
        "serie-atualizada": serieEncontrada,
        seriesJson
    }])
}



const updateActors = async (request, response) => {
    let seriesJson = await dbConnect()
    const idRequest = request.params.actors
    const newActor = request.body.actors

    const serieEncontrada = seriesJson.find(serie => serie.actors == actorsRequest)

    serieEncontrada.actors = newActor

    response.status(200).json([{
        "mensagem": "serie atualizada com sucesso",
        "serie-atualizada": serieEncontrada,
        seriesJson
    }])
}


const excluir = async(request, response)=>{
    let seriesJson = await dbConnect()
    const idRequest = request.params.id
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrada)

    seriesJson.splice(indice, 1)

    response.status(200). json([{
        "mensagem": "serie deletada com sucesso",
        "serie-deletada" : serieEncontrada,
        seriesJson 
    }])
}




//exportando cada função par aser usada nas routers
module.exports = {
    getAll,
    getById,
    searchTitle,
    searchGenre,
    createSerie,
    replaceById,
    updateTitle,
    updateActors,
    excluir

}


