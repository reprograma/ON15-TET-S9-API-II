//Aqui fica o que vai ser chamado pelas rotas (o que compoe a lógica de cada uma)

//Chamando o "banco de dados" | dbConfig não está no controllers, tem que colocar dois pontos
const dbConfig = require("../models/dbConfig.js")

//executando a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}
//getAll (pega todos os filmes)
const getAll = async (request, response) =>{
    let filmesJson = await dbConnect()
    response.status(200).send(filmesJson)
}

//getById 
const getById = async (request, response)=>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmesJson)
}

//searchTitle
const searchTitle = async (request, response)=>{
    let filmesJson = await dbConnect()
    let titleRequest = request.query.Title.toLowerCase()
    let filmeEncontrado = filmesJson.filter(
        filme => filme.Title.toLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
    
}

//createMovie
const createMovie = async (request, response)=>{
    let filmesJson = await dbConnect()
    let bodyRequest = request.body
    let newMovie = {
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
    filmesJson.push(newMovie)
    response.status(201).json({
        "Mensagem": "Seu filme foi cadastrado com sucesso!",
        newMovie //só pra ver o que foi cadastrado
    })
}

//deleting
const deleting = async (request, response)=>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    let indice = filmesJson.indexOf(filmeEncontrado)
    filmesJson.splice(indice, 1) //cheguei no indice do filme e deletei 1 ítem
    response.status(200).json({
        "Mensagem": "O filme foi deletado com sucesso!",
        filmesJson //pra ver como ficou a lista de filmes
    })
}

//completeUpdate
const completeUpdate = async (request, response)=>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    let bodyRequest = request.body
    let updatedMovie = {
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
    let indice = filmesJson.indexOf(filmeEncontrado)
    filmesJson.splice(indice, 1, updatedMovie)
    response.status(201).json({
        "Mensagem": "O filme foi atualizado com sucesso!",
        filmesJson //pra ver como ficou a lista de filmes
    })     
}
//updatedTitle
const updatedTitle = async (request, response)=>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    let newTitle = request.body.Title
    filmeEncontrado.Title = newTitle
    response.status(201).send({
        "Mensagem": "Filme atualizado com sucesso!",
        filmesJson
    })

}

//[PATCH]/filmes/update/:id (atualiza o que vier no body)
//nao entendi o que é pra ser feito nessa rota 

module.exports = {
    getAll,
    getById,
    searchTitle,
    createMovie,
    deleting,
    completeUpdate,
    updatedTitle

}