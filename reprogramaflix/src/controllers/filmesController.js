//logica da nossa API

//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os filmes
//filmes/catalogo
const getAll = async (request, response) =>{
    try {
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)

    } catch (error){
        response.status(500).json({message: error.message})
    }
 
}

//filmes/catalogo/:id
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

//query params key:value
//[patch] filmes/updateTitle/:id?Title=value

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
                filmeEncontrado,
             }]
        )
    } catch (error) {

    }
}


//exportando cada função par aser usada nas routers
module.exports = {
    getAll,
    getById,
    createMovie,
    updateTitle
}