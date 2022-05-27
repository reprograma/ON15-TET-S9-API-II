const dbConfig = require("../models/dbConfig")


async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request, response) =>{
    let filmesJson = await dbConnect()
    response.status(200).send(filmesJson)
}

const getById = async (request, response)=>{
    let filmesJson = await dbConnect()

    let idRequest = request.params.id 
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
}

const getTitle = async(request, response)=>{
    let filmesJson = await dbConnect()

    let tituloRequest = request.query.titulo.toLowerCase();
    let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
    
    response.status(200).send(filmeEncontrado)
}

const createMovie = async(request, response)=>{
    let filmesJson = await dbConnect()

    let bodyRequest = request.body

    let novoFilme = {

        id: (filmesJson.length) + 1,
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
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}

const deleteById = async(request, response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)
    console.log(indice)


    filmesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        filmesJson
    }])
}

const updateAll = async(request, response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    
    const indice = filmesJson.indexOf(filmeEncontrado)

    bodyRequest.id = idRequest

    filmesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        filmesJson
    }])
}

const updateTille = async(request,response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.title
    
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
    filmeEncontrado.title = newTitle
    
    response.status(200).json([{
            "mensagem": "titulo atualizado com sucesso",
            "filme-atualizado": filmeEncontrado,
            filmesJson
    }])
}

const update = async(request, response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    bodyRequest.id = idRequest
    filmeEncontrado = bodyRequest
    
    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        filmesJson
    }])
}


module.exports = {
    getAll,
    getById,
    getTitle,
    createMovie,
    deleteById,
    updateAll,
    updateTille,
    update
}