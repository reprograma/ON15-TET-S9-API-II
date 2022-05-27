//o que vai ser chamado pelas rotas (o que compoe a lógica de cada uma)

//Chamando o "banco de dados" 
const dbConfig = require("../models/dbConfig.js")

//executando a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}
//getAll
const getAll = async (request, response) =>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}

//getById 
const getById = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    response.status(200).send(serieEncontrada)
}

//searchTitle
const searchTitle = async (request, response)=>{
    let seriesJson = await dbConnect()
    let titleRequest = request.query.Title.toLowerCase()
    let serieEncontrada = seriesJson.filter(
        serie => serie.Title.toLowerCase().includes(titleRequest))
    response.status(200).send(serieEncontrada)
    
}

//createShow
const createShow = async (request, response)=>{
    let seriesJson = await dbConnect()
    let bodyRequest = request.body
    let newShow = {
        "id": (seriesJson.lenght)+1, 
        "Title":bodyRequest.Title,
        "Year":bodyRequest.Year,
        "Rated":bodyRequest.Rated,  
        "Released": bodyRequest.Released,  
        "Runtime": bodyRequest.Runtime, 
        "Genre": bodyRequest.Genre,  
        "Director": bodyRequest.Director,  
        "Writer":bodyRequest.Writer,
        "Actors": bodyRequest.Actors,
        "Plot": bodyRequest.Plot,
        "Language": bodyRequest.Language, 
        "Country": bodyRequest.Country,
        "Awards": bodyRequest, Awards 
    }
    seriesJson.push(newShow)
    response.status(201).json({
        "Mensagem": "Sua série foi cadastrada com sucesso!",
        newShow //só pra ver o que foi cadastrado
    })
}

//deleting
const deleting = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    let indice = seriesJson.indexOf(serieEncontrada)
    seriesJson.splice(indice, 1) //cheguei no indice e deletei 1 ítem
    response.status(200).json({
        "Mensagem": "A série foi deletada com sucesso!",
        seriesJson //pra ver como ficou a lista de series
    })
}

//completeUpdate
const completeUpdate = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    let bodyRequest = request.body
    let updatedShow = {
        "id": (filmesJson.lenght)+1, 
        "Title":bodyRequest.Title,
        "Year":bodyRequest.Year,
        "Rated":bodyRequest.Rated,  
        "Released": bodyRequest.Released,  
        "Runtime": bodyRequest.Runtime, 
        "Genre": bodyRequest.Genre,  
        "Director": bodyRequest.Director,  
        "Writer":bodyRequest.Writer,
        "Actors": bodyRequest.Actors,
        "Plot": bodyRequest.Plot,
        "Language": bodyRequest.Language, 
        "Country": bodyRequest.Country,
        "Awards": bodyRequest, Awards 
    }
    let indice = seriesJson.indexOf(serieEncontrada)
    filmesJson.splice(indice, 1, updatedShow)
    response.status(201).json({
        "Mensagem": "A série foi atualizado com sucesso!",
        seriesJson //pra ver como ficou a lista de filmes
    })     
}
//updatedTitle
const updatedTitle = async (request, response)=>{
    let seriesJson = await dbConnect()
    let idRequest = request.params.id
    let serieEncontrada =seriesJson.find(serie => serie.id == idRequest)
    let newTitle = request.body.Title
    serieEncontrada.Title = newTitle
    response.status(201).send({
        "Mensagem": "Série atualizada com sucesso!",
       seriesJson
    })

}

//[PATCH]/filmes/update/:id (atualiza o que vier no body)
//nao entendi o que é pra ser feito nessa rota 

module.exports = {
    getAll,
    getById,
    searchTitle,
    createShow,
    deleting,
    completeUpdate,
    updatedTitle

}