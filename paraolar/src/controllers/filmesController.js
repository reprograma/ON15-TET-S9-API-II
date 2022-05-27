const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)
    } catch (error){
        response.status(500).json({
            "mensagem": "Erro interno do Servidor."
        })
    }
}

const getById = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        response.status(200).send(filmeEncontrado)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const getByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        
        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        
        response.status(200).send(filmeEncontrado)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const getByGenre = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase()
        
        let filmeEncontrado = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))

        response.status(200).send(filmeEncontrado)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const createMovie = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let bodyRequest = request.body
        
        let novoFilme = {
            "id": (filmesJson.length)+1,
            "Title": bodyRequest.Title,
            "Year": bodyRequest.Year,
            "Rated": bodyRequest.Rated,
            "Released": bodyRequest.Released,
            "Runtime": bodyRequest.Runtime,
            "Genre": bodyRequest.Genre,
            "Director": bodyRequest.Director,
            "Writer": bodyRequest.Writer,
            "Actors": bodyRequest.Actors,
            "Plot": bodyRequest.Plot,
            "Language": bodyRequest.Language,
            "Country": bodyRequest.Country,
            "Awards": bodyRequest.Awards
        }

        filmesJson.push(novoFilme)

        response.status(201).send({
            "mensagem": "Filme foi cadastrado com sucesso.",
            novoFilme
        })
    } catch (error){
        response.status(500).json({
            "mensagem": "Erro interno do Servidor."
        })
    }
}

const deleteMovie = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        let i = filmesJson.indexOf(filmeEncontrado)
        filmesJson.splice(i, 1)

        response.status(200).json([{
            "mensagem": "Filme deletado com sucesso.",
            "filme deletado": filmeEncontrado,
            filmesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateMovie = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        let i = filmesJson.indexOf(filmeEncontrado)
        bodyRequest.id = idRequest
        filmesJson.splice(i, 1, bodyRequest)

        response.status(200).json([{
            "mensagem": "Filme atualizado com sucesso.",
            "filme atualizado": filmeEncontrado,
            filmesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let novoTitulo = request.body.Title

        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        filmeEncontrado.Title = novoTitulo

        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso.",
            "filme atualizado": filmeEncontrado,
            filmesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateById = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id;
        let novoTitulo = request.body.Title
        
        let filmeEncontrado = filmesJson.find(filme => filme. id == idRequest)
        filmeEncontrado.Title = novoTitulo

        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso.",
            "filme atualizado": filmeEncontrado,
            filmesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    deleteMovie,
    updateMovie,
    updateByTitle,
    updateById
}