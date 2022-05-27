const dbConfig = require("../models/dbConfig")

async function dbConfigConnect() {
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response) => {
    let filmesJson = await dbConfigConnect()
    response.status(200).send(filmesJson)
}
const getById = async(request, response) => {
    let filmesJson = await dbConfigConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
}
const createMovie = async(request, response) => {
    let filmesJson = await dbConfigConnect()

    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length) + 1,
        Title: bodyRequest.Title,
        Plot: bodyRequest.Plot
    }
    filmesJson.push(novoFilme)

    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}
module.exports = {
    getAll,
    getById,
    createMovie
}