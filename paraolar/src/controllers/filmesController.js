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

        if(filmeEncontrado == undefined) throw new Error("Título não encontrado")

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
            Year: bodyRequest.Year,
            Rated: bodyRequest.Rated,
            Released: bodyRequest.Released,
            Runtime: bodyRequest.Runtime,
            Genre: bodyRequest.Genre,
            Director: bodyRequest.Director,
            Writer: bodyRequest.Writer,
            Actors: bodyRequest.Actors,
            Plot: bodyRequest.Plot,
            Language: bodyRequest.Language,
            Country: bodyRequest.Country,
            Awards: bodyRequest.Awards
        }
        filmesJson.push(novoFilme)
        
        response.status(201).send([{
            "mensagem": "Título cadastrado com sucesso",
            novoFilme
        }])
    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[PUT]rota: /substituir/:id
const replaceTitle = async (request, response) => {
    try{
        let filmesJson = await dbConnect()

        let idRequest = request.params.id   
        let bodyRequest = request.body        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        bodyRequest.id = idRequest
        filmeEncontrado = bodyRequest
    
        if(filmeEncontrado == undefined) throw new Error("Não foi possível substituir este título.")
    
        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso",
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
        let newTitle = request.body.Title
        filmesJson.push(newTitle)
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        filmeEncontrado.Title = newTitle        
        
        response.status(200).json([{
                "mensagem": "Título atualizado com sucesso.",
                "título-atualizado": filmeEncontrado,
                filmesJson
            }])

    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[DELETE]rota: /deletar/:id
const deleteTitle = async(request, response) => {
    try {
        let filmesJson = await dbConnect()

        let idRequest = request.params.id
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)    
        let indice = filmesJson.indexOf(filmeEncontrado) 

        filmesJson.splice(indice, 1)     

        if(filmeEncontrado == undefined) throw new Error("Não foi possível deletar este título.")

        response.status(200).send([{
            "mensagem": "Título deletado com sucesso",
            "título-deletado": filmeEncontrado,
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