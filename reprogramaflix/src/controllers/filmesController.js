//logica da nossa API

//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os filmes
const getAll = async (request, response) =>{
    let filmesJson = await dbConnect()
    response.status(200).send(filmesJson)
}

const getById = async (request, response)=>{
    //conecta no banco de dados
    let filmesJson = await dbConnect()

    let idRequest = request.params.id //peguei o id enviado na request
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
}

const createMovie = async(request, response)=>{
    let filmesJson = await dbConnect()

    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length)+1, 
        Title: bodyRequest.Title, 
        Plot: bodyRequest.Plot 
    }
    filmesJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}

//exportando cada função par aser usada nas routers
module.exports = {
    getAll,
    getById,
    createMovie
}