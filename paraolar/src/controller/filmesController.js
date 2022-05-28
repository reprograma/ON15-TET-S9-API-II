// controler chama a configuração do banco de dados

const dbConfig = require("../models/dbConfig")

async function conectaBancoDeDados(){
    return await dbConfig.bancoDeDados("filmes")
}




//GET
const getAll = async(req, res) => {
    let filmes = await conectaBancoDeDados()
    res.status(200).send(filmes)
}

//POST
const create = async(req, res) => {
    let filmes = await conectaBancoDeDados()
    let bodyRequest = req.body
    let novoFilme = ({
        id: filmes.length + 1,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year
    })

    filmes.push(novoFilme)

    res.status(201).send(novoFilme)
}

//PUT
const updateId = async(req, res) => {
    let filmes = await conectaBancoDeDados()
    let idRequest = req.params.id
    let filmeSelecionado = filmes.find(filme => filme.id == idRequest)
    filmeSelecionado = ({
        id: idRequest,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year
    })
    res.status(200).send(filmeSelecionado)
}


//DELETE

const deletar = async(req, res) => {
    let filmes = await conectaBancoDeDados()
    let idRequest = req.params.id
    let idSelecionado = filmes.findIndex(filme => filme.id == idRequest)
    filmes.splice(idSelecionado, 1)
    res.status(200).send("Filme deletado com sucesso")
}








module.exports = {getAll, create, updateId, deletar
}