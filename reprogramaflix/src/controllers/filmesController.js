//logica da nossa API
//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//getAll retorna todos os filmes
//filmes/catalogo/:id
const getAll = async (request, response) =>{
    try{
        let filmesJson = await dbConnect()
        response.status(200).send(filmesJson)

    } catch (error){
        response.status(500).json({message:error.message})
    }  
}
//path params: id 
//filmes/catalogo
const getById = async (request, response)=>{
    try{
        //conecta no banco de dados    
        let filmesJson = await dbConnect()
    
        let idRequest = request.params.id //peguei id enviado na request
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        if(filmeEncontrado == undefined) throw new Error("id não encontrado")
        response.status(200).send(filmeEncontrado)

    } catch (error){
        response.status(404).json({message: error.message})
    }
    
}

const createMovie = async (request, response)=>{
    let filmesJson =  await dbConnect()  

    let bodyRequest = request.body
    
        let novoFilme = {
            id: (filmesJson.length)+1, 
            Title: bodyRequest.Title, 
            description: bodyRequest.Plot 
        }
        filmesJson.push(novoFilme)
        
        response.status(201).send({
            "mensagem": "filmes cadastrado com sucesso",
            novoFilme
        })
    }

//queryparams key:value
//[patch] filmes/updateTitle?id=value
const updateTitle = async(request, response)=>{
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = resquest.body.Title //novo título

        filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        filmeEncontrado.Title = bodyRequest

        response.status(200).json(
        [{
            "mensagem" : "filme atualizado com sucesso", 
            filmeEncontrado
        }])
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }

}

//exportando cada função par aser usada nas routers
module.exports = {
    getAll,
    getById,
    createMovie,
    updateTitle
}