//lógica da nossa API

//chamar o banco de dados
const dbConfig = require("../models/dbConfig")

//conectando a dbConfig
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os filmes
const getAll = async(request, response) => {
    let filmesJson = await dbConnect()
    response.status(200).send(filmesJson)
}

//getById retornar Id 
const getById = async(request, response) =>{
    let filmesJson = await dbConnect()
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
}

const creatMovie = async (request, response)=>{
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

//exportando cada função para acessar usada nas routers
module.exports = {
    getAll,
    getById,
    creatMovie
}