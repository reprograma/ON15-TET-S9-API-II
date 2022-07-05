// Logica da nossa API
const dbConfig = require ("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(request,response) => {
  let seriesJson = await dbConnect()
  response.status(200).send(seriesJson)
}

const getById = async (request, response) =>{
    let seriesJson = await dbConnect()

    let idRequest = request.params.idRequest
    let serieEncontrada = seriesJson.find(serie => serie.id = idRequest)
    response.status(200).send(serieEncontrada)
}

const getFiltro = async (request, response) =>{
    let seriesJson = await dbConnect()
    let titleRequest = request.query.title.toLowerCase()
    let serieEncontrada = seriesJson.filter(
    serie => serie.Title.toLowerCase().includes(titleRequest))
    response.status(200).send(serieEncontrada)
}

const createMovie = async (request, response) =>{
    let seriesJson = await dbConnect()

    let bodyRequest = request.body
    
    let novaSerie = {

        id: (seriesJson.length)+1,
        Title: bodyRequest.Title,
        Plot: bodyRequest.Plot
    }
    seriesJson.push(novaSerie)
        response.status(201).send({
            "mensagem": "serie cadastrado com sucesso",
             novaSerie
        })

}

const deletePorId = async (request, response) =>{
    let serieEncontrada = await dbConnect()

    const idRequest = request.params.id
    const seriesEncontrada = seriesJson.find(serie => serie.id == idRequest)
    const indice = seriesJson.indexOf(seriesEncontrada)
    console.log(indice)


    seriesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Serie deletada com sucesso",
        "serie-deletada": seriesEncontrada,
        seriesJson
    }])

}

const putUpdateId = async (request, response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body
    const seriesEncontrada = seriesJson.find(series => series.id == idRequest)

    const indice = seriesJson.indexOf(seriesEncontrada)
    bodyRequest.id = idRequest
    seriesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "Serie atualizado com sucesso",
        "serie-atualizada": bodyRequest,
    }])
}
const patchUpdateTitleid = async (request, response)=>{
    let seriesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.Title
    const seriesEncontrada= seriesJson.find(series => series.id == idRequest)
    seriesEncontrada.Title = newTitle

    response.status(200).json ([{
        "mensagem": "Titulo atualizado com sucesso",
        "serie-atualizado": filmeEncontrado

    }])
}

const patchUpdateTitle = async (request, response)=>{
        let seriesJson = await dbConnect()
        const patchUpdateTitle = requere.query.Titulo.toLowerCase();
        const novoTitulo = requery.body.Title

        seriesEncontrada.Title = novoTitulo

        response.status(200).json([{
            "mensagem":"Titulo atualizado com sucesso,"

        }])
        

}

    //exportando cada ação para ser ussana nas routs
    module.exports = {
        getAll,
        getById,
        getFiltro,
        createMovie,
        deletePorId,
        putUpdateId,
        patchUpdateTitleid,
        patchUpdateTitle

    }