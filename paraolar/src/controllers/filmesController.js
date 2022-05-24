const dbConfig = require("../models/dbConfig.js")


async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}


const getAll = async (request, response) =>{
    let filmesJson = await dbConnect()
    response.status(200).send(filmesJson)
}

const getById = async (request, response)=>{
    
    let filmesJson = await dbConnect()

    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
}

const searchTitle = async (request, response) => {
    let filmesJson = await dbConnect()
    let tituloRequest = request.query.Title.toLowerCase()

    let filmeEncontrado = filmesJson.filter(
    filme => filme.Title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)

}


const searchGenre = async (request, response) => {
    let filmesJson = await dbConnect()
    let tituloRequest = request.query.Genre.toLowerCase()

    let filmeEncontrado = filmesJson.filter(
    filme => filme.Genre.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
    
}

const createMovie = async (request, response) => {
    let filmesJson = await dbConnect()

    let bodyRequest  = request.body

    let novoFilme = {
       
        "id": bodyRequest.id, 
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

    filmesJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}

const replaceById = async(request, response) => {
    let filmesJson = await dbConnect()
    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)

    bodyRequest.id = idRequest

    filmesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        filmesJson
    }])
}


const updateTitle = async (request, response) => {
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.Title

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)


    filmeEncontrado.Title = newTitle

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        filmesJson
    }])
}


const updateYear = async (request, response) => {
    let filmesJson = await dbConnect()
    const idRequest = request.params.id
    const newGenre = request.body.Genre

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    filmeEncontrado.Genre = newGenre

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        filmesJson
    }])
}

const excluir = async(request, response)=>{
    let filmesJson = await dbConnect()
    const idRequest = request.params.id
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)

    filmesJson.splice(indice, 1)

    response.status(200). json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado" : filmeEncontrado,
        filmesJson 
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
    updateYear,
    excluir

}
