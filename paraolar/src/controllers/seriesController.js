const dbConfig = require("../models/dbConfig")


async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//[GET]rota: /catalogo
const getAll = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()

        response.status(200).send(seriesJson)
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}

//[GET]rota: /buscar/:id 
const getById = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        if(serieEncontrada == undefined) throw new Error("Título não encontrado")

        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[GET]rota: /filtrar
const getByTitle = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()

        let titleRequest = request.query.title.toLowerCase()
        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(titleRequest))

        if(serieEncontrada.length == 0) throw new Error("Título não encontrado.")

        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[GET]rota: /genero
const getByGenre = async (request, response)=>{
    try{
        let seriesJson = await dbConnect()

        let genreRequest = request.query.Genre.toLowerCase()
        let serieEncontrada = seriesJson.filter(serie => serie.Genre.toLowerCase().includes(genreRequest))

        if(serieEncontrada == undefined) throw new Error("Gênero não encontrado.")

        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[POST]rota: /cadastrar/:id
const createSeries = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
    
        let bodyRequest = request.body    
        bodyRequest.id = parseInt((series[series.length - 1].id)) + 1
    
        seriesJson.push(novoserie)
        
        response.status(201).send([{
            "mensagem": "Título cadastrado com sucesso",
            novoserie
        }])
    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[PUT]rota: /substituir/:id
const replaceTitle = async (request, response) => {
    try{
        let seriesJson = await dbConnect()

        let idRequest = request.params.id   
        let bodyRequest = request.body        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        bodyRequest.id = idRequest
        serieEncontrada = bodyRequest    
            
        if(serieEncontrada == undefined) throw new Error("Não foi possível substituir este título.")
    
        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso",
            "serie-atualizado": bodyRequest,
            seriesJson
        }])
    } catch (error) {
        response.status(404).json({message:error.message})
    }
}

//[PATCH]rota: /updateTitulo/:id
const updateTitle = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let newTitle = request.body.Title
        
        serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        serieEncontrada.title = newTitle        
        
        response.status(200).json([{
                "mensagem": "Título atualizado com sucesso.",
                "título-atualizado": serieEncontrada,
                seriesJson
            }])

    } catch (error) {
        response.status(404).json({message:error.message}) 
    }
}

//[DELETE]rota: /deletar/:id
const deleteTitle = async(request, response) => {
    try {
        let seriesJson = await dbConnect()

        let idRequest = request.params.id
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)    
        let indice = seriesJson.indexOf(serieEncontrada) 

        seriesJson.splice(indice, 1)     

        if(serieEncontrada == undefined) throw new Error("Não foi possível deletar este título.")

        response.status(200).send([{
            "mensagem": "Título deletado com sucesso",
            "título-deletado": serieEncontrada,
            seriesJson
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
    createSeries,
    replaceTitle,
    updateTitle,
    deleteTitle
}