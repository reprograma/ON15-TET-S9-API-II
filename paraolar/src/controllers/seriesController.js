const dbConfig = require("../models/dbConfig")


async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}


const getAll = async (request, response) =>{
    let seriesJson = await dbConnect()
    response.status(200).send(seriesJson)
}


const getById = async (request, response)=>{
    let seriesJson = await dbConnect()

    let idRequest = request.params.id 
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    response.status(200).send(serieEncontrada)
}

const getTitle = async(request, response)=>{
    let seriesJson = await dbConnect()

    let tituloRequest = request.query.titulo.toLowerCase()
    let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)
}

const getByGenre = async (request, response) => {
    let seriesJson = await dbConnect();
    let generoRequest = request.query.genre.toLowerCase();

    let serieEncontrada = seriesJson.filter(serie => serie.genre.toString().toLowerCase().includes(generoRequest));

    response.status(200).send(serieEncontrada)
}

const createSerie = async(request, response)=>{
    let seriesJson = await dbConnect()

    let bodyRequest = request.body

    let novaSerie = {

        id: (seriesJson.length) + 1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: bodyRequest.ratings
    }
    seriesJson.push(novaSerie)
    
    response.status(201).send({
        "mensagem": "Serie cadastrada com sucesso",
        novaSerie
    })
}

const deleteById = async(request, response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    const indice = seriesJson.indexOf(serieEncontrada)
    console.log(indice)


    seriesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Serie deletada com sucesso",
        "serie-deletada": serieEncontrada,
        seriesJson
    }])
}

const updateAll = async(request, response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body

    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    
    const indice = seriesJson.indexOf(serieEncontrada)

    bodyRequest.id = idRequest

    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "Série atualizada com sucesso",
        "serie-atualizada": bodyRequest,
        seriesJson
    }])
}

const updateTille = async(request,response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.title
    
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    
    serieEncontrada.title = newTitle
    
    response.status(200).json([{
            "mensagem": "Titulo atualizado com sucesso",
            "serie-atualizada": serieEncontrada,
            seriesJson
    }])
}

const update = async(request, response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body
    const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    bodyRequest.id = idRequest
    serieEncontrada = bodyRequest

    
    response.status(200).json([{
        "mensagem": "Série atualizada com sucesso",
        "serie-atualizada": serieEncontrada,
        seriesJson
    }])
}


module.exports = {
    getAll,
    getById,
    getTitle,
    getByGenre,
    createSerie,
    deleteById,
    updateAll,
    updateTille,
    update
}