//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//getAll retorna todos as series
//[GET] series/catalogo
const getAll = async (request, response) =>{
    try {
        let seriesJson = await dbConnect()

        response.status(200).send(seriesJson)

    } catch (error){
        response.status(500).json({message: error.message})
    }
 
}

//[GET] series/catalogo/:id
const getById = async (request, response)=>{
    try {
        //conecta no banco de dados
        let seriesJson = await dbConnect()

        let idRequest = request.params.id //peguei o id enviado na request
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        // if (serieEncontrada == undefined) throw new Error("id não encontrado")
        // response.status(200).send(serieEncontrada)    
    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//[GET] serie/catalogo/series?title:value - retorna um filme pelo nome
const getByTitle = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()

        let titleRequest = request.query.Title.toLowerCase()
        let nomeEncontrado = seriesJson.filter(serie => serie.Title.toLowerCase().includes(titleRequest))
        response.status(200).send(nomeEncontrado)    
    } catch (error){
        response.status(404).json({message: error.message})
    }
}

//[POST] /filmes/cadastrar
const createSerie = async(request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let bodyRequest = request.body

        let novaSerie = {
            id: (seriesJson.length)+1, 
            Title: bodyRequest.Title, 
            Plot: bodyRequest.Plot 
        }
        seriesJson.push(novoFilme)
        
        response.status(201).send({
            "mensagem": "série cadastrada com sucesso",
            novaSerie
        })
    } catch (error){
        response.status(500).json({message: error.message})
    }
}

//[PUT]/series/update/:id - atualiza uma série por inteiro
//metodo PUT que tem a função de substituir o dado
const replaceSerie = async(request, response)=>{
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        let indice = seriesJson.indexOf(serieEncontrada)

        bodyRequest.id = idRequest
        seriesJson.splice(indice, 1, bodyRequest)

        response.status(200).json([{
            "mensagem": "série substituída com sucesso",
            "série-substituida": bodyRequest,
            seriesJson
        }])
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//query params key:value
//[PATCH] series/updateTitle/:id?Title=value

const updateTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body.Title //novo titulo
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        //agora o titulo da serie vai ser o que foi enviado no request
        serieEncontrada.Title = bodyRequest 

        response.status(200).json(
            [{
                "mensagem": "série atualizada com sucesso",
                "série-atualizado": serieEncontrada,
                seriesJson
             }]
        )
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}
//[PATCH]/series/update/:id - atualiza o que vier no body
//metodo PATCH que vai atualizar o titulo de um dado ja existente
const updateBody = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        //agora o titulo do filme vai ser o que foi enviado no request
        serieEncontrada = bodyRequest 

        response.status(200).json(
            [{
                "mensagem": "série atualizada com sucesso",
                "série-atualizado": serieEncontrada,
                seriesJson
             }]
        )
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//[DELETE]/series/deletar/:id
const deleteSerie = async (request, response) => {
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        let indice = seriesJson.indexOf(serieEncontrada)
        seriesJson.splice(indice, 1)

        response.status(200).json([{
            "mensagem": "série deletada com sucesso",
            "serie-deletada": serieEncontrada, 
            seriesJson
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
    createSerie,
    replaceSerie,
    updateTitle,
    updateBody,
    deleteSerie
}

module.exports = {
    getAll
}
