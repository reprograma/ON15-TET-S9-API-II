const dbConfig = require("../models/dbConfig")


async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//[GET]rota: /filmes/catalogo
const getAll = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()

        response.status(200).send(filmesJson)
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}

//[GET]rota: /filmes/catalogo/:id 
const getById = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()

        let idRequest = request.params.id 

        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[GET]rota: /filtrar
const getByTitle = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()

        let titleRequest = request.query.Title.toLowerCase()

        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(titleRequest))

        if(filmeEncontrado == undefined) throw new Error("Título não encontrado.")

        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[GET]rota: /genero
const getByGenre = async (request, response)=>{
    try{
        let filmesJson = await dbConnect()

        let genreRequest = request.query.Genre.toLowerCase()

        let filmeEncontrado = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(genreRequest))

        if(filmeEncontrado == undefined) throw new Error("Gênero não encontrado.")

        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[POST]rota: /cadastrar/:id
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
            "mensagem": "filme cadastrado com sucesso",
            novoFilme
        })
    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[PUT]rota: /substituir/:id
const replaceTitle = async (request, response) => {
    try{
        let idRequest = request.params.id   
        let bodyRequest = request.body
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        let indice = ghibliJson.indexOf(filmeEncontrado)
    
        bodyRequest.id = idRequest
    
        filmesJson.splice(indice, 1, bodyRequest)
    
        if(filmeEncontrado == undefined) throw new Error("Não foi possível substituir este título.")
    
        response.status(200).json([{
            "mensagem": "Filme atualizado com sucesso",
            "filme-atualizado": bodyRequest,
            filmesJson
        }])
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[PATCH]rota: /updateTitulo/:id
const updateTitle = async(request, response)=>{
    try {
        let filmesJson = await dbConnect()

        let idRequest = request.params.id
        let bodyRequest = request.body.Title

        filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        filmeEncontrado.Title = bodyRequest

        
        response.status(200).json(
            [{
                "mensagem": "Filme atualizado com sucesso.",
                filmeEncontrado
            }]
        )

    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[DELETE]rota: /deletar/:id
const deleteTitle = async(request, response) => {
    try {
        let idRequest = request.params.id
        let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    
        let indice = ghibliJson.indexOf(filmeEncontrado)
    
        ghibliJson.splice(indice, 1)
        
        if(filmeEncontrado == undefined) throw new Error("Não foi possível deletar este título.")

        response.status(200).json([{
            "mensagem": "filme deletado com sucesso",
            "filme-deletado": filmeEncontrado,
            filmesJson
        }])
    } catch (error) {
        response.status(404).json({message:error.message}) 
    }

}










module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    replaceTitle,
    updateTitle,
    deleteTitle

}