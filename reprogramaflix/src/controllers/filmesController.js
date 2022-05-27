//onde fica a lógica da api

//chamar o banco
const dbConfig = require("../models/dbConfig")

//configurar a conexão com o banco de dados
//utilizar o await pra esperar o tempo do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os dados de filmes
const getAll = async(req, res)=>{
    let filmesJson = await dbConnect()
    res.status(200).send(filmesJson)
}

const getById = async (request, response)=>{
    let filmesJson = await dbConnect()
    let idRquest = request.params.id //pegar o id enviado na request
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRquest)

    response.status(200).send(filmeEncontrado)
}

const createMovie = async(req, res)=>{
    let filmesJson = await dbConnect()
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length)+1, 
        Title: bodyRequest.Title, 
        Plot: bodyRequest.Plot 
    }
    filmesJson.push(novoFilme)
    
    res.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}

//exportar para ser usada em outras routers
module.exports = {
    getAll,
    getById,
    createMovie
}