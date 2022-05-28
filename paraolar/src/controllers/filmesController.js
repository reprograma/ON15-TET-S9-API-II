//logica da nossa API

//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os filmes
//[GET] filmes/catalogo
const getAll = async (request, response) =>{
    try {
        let filmesJson = await dbConnect()

        response.status(200).send(filmesJson)

    } catch (error){
        response.status(500).json({message: error.message})
    }
 
}

//[GET] filmes/catalogo/:id
const getById = async (request, response)=>{
    try {
        //conecta no banco de dados
        let filmesJson = await dbConnect()

        let idRequest = request.params.id //peguei o id enviado na request
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        if (filmeEncontrado == undefined) throw new Error("id não encontrado")
        response.status(200).send(filmeEncontrado)    
    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//[GET] filmes/catalogo/filmes?title:value - retorna um filme pelo nome
const getByTitle = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()

        let titleRequest = request.query.Title.toLowerCase()
        let nomeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(titleRequest))
        response.status(200).send(nomeEncontrado)    
    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//[POST] /filmes/cadastrar
const createMovie = async(request, response)=>{
    try {
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
    } catch (error){
        response.status(500).json({message: error.message})
    }
}

//[PUT]/filmes/update/:id - atualiza um filme por inteiro
//metodo PUT que tem a função de substituir o dado
const replaceMovie = async(request, response)=>{
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        let indice = filmesJson.indexOf(filmeEncontrado)

        bodyRequest.id = idRequest
        filmesJson.splice(indice, 1, bodyRequest)

        response.status(200).json([{
            "mensagem": "filme substituído com sucesso",
            "filme-substituido": bodyRequest,
            filmesJson
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//query params key:value
//[PATCH] filmes/updateTitle/:id?Title=value

const updateTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body.Title //novo titulo
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        //agora o titulo do filme vai ser o que foi enviado no request
        filmeEncontrado.Title = bodyRequest 

        response.status(200).json(
            [{
                "mensagem": "filme atualizado com sucesso",
                "filme-atualizado": filmeEncontrado,
                filmesJson
             }]
        )
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//[PATCH]/filmes/update/:id - atualiza o que vier no body
//metodo PATCH que vai atualizar o titulo de um dado ja existente
const updateBody = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        //agora o titulo do filme vai ser o que foi enviado no request
        filmeEncontrado = bodyRequest 

        response.status(200).json(
            [{
                "mensagem": "filme atualizado com sucesso",
                "filme-atualizado": filmeEncontrado,
                filmesJson,
             }]
        )
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//[DELETE]/filmes/deletar/:id
const deleteMovie = async (request, response) => {
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        let indice = filmesJson.indexOf(filmeEncontrado)
        filmesJson.splice(indice, 1)

        response.status(200).json([{
            "mensagem": "filme deletado com sucesso",
            "filme-deletado": filmeEncontrado, 
            filmesJson
        }])
    } catch(error) {
        response.status(500).json({message: error.message})
    }
}


//exportando cada função par aser usada nas routers
module.exports = {
    getAll,
    getById,
    getByTitle,
    createMovie,
    replaceMovie,
    updateTitle,
    updateBody,
    deleteMovie
}