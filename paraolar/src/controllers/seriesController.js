const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
    } catch (error){
        response.status(500).json({
            "mensagem": "Erro interno do Servidor."
        })
    }
}

const getById = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        response.status(200).send(serieEncontrada)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const getByTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        
        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
        
        response.status(200).send(serieEncontrada)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const getByGenre = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase()
        
        let serieEncontrada = seriesJson.filter(serie => serie.genre.toLowerCase().includes(generoRequest))

        response.status(200).send(serieEncontrada)
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const createSerie = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let bodyRequest = request.body
        
        let novaSerie = {
            "id": (seriesJson.length) + 1,
            "title": bodyRequest.title,
            "totalSeason": bodyRequest.totalSeason,
            "genre": bodyRequest.genre,
            "writers": bodyRequest.writers,
            "poster": bodyRequest.poster,
            "actors": bodyRequest.actors,
            "ratings": bodyRequest.ratings
        }

        seriesJson.push(novaSerie)

        response.status(201).send({
            "mensagem": "Série foi cadastrada com sucesso.",
            novaSerie
        })
    } catch (error){
        response.status(500).json({
            "mensagem": "Erro interno do Servidor."
        })
    }
}

const deleteSerie = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        let i = seriesJson.indexOf(serieEncontrada)
        seriesJson.splice(i, 1)

        response.status(200).json([{
            "mensagem": "Série deletada com sucesso.",
            "serie deletada": serieEncontrada,
            seriesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateSerie = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        let i = seriesJson.indexOf(serieEncontrada)
        bodyRequest.id = idRequest
        seriesJson.splice(i, 1, bodyRequest)

        response.status(200).json([{
            "mensagem": "Série atualizada com sucesso.",
            "série atualizada": serieEncontrada,
            seriesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateByTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let novoTitulo = request.body.title

        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
        serieEncontrada.title = novoTitulo

        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso.",
            "série atualizada": serieEncontrada,
            seriesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

const updateById = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id;
        let novoTitulo = request.body.title
        
        let serieEncontrada = seriesJson.find(serie => serie. id == idRequest)
        serieEncontrada.title = novoTitulo

        response.status(200).json([{
            "mensagem": "Título atualizado com sucesso.",
            "série atualizada": serieEncontrada,
            seriesJson
        }])
    } catch (error){
        response.status(404).json({
            "mensagem": "Não encontrado"
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createSerie,
    deleteSerie,
    updateSerie,
    updateByTitle,
    updateById
}