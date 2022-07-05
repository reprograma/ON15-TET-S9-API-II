// Logica da nossa API
const dbConfig= require ("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

const getAll = async(request,response) => {
  let filmesJson = await dbConnect()
  response.status(200).send(filmesJson)
}

const getById = async (request, response) =>{
    let filmesJson = await dbConnect()

    let idRequest = request.params.idRequest
    let filmeEncontrado = filmesJson.find(filme => filme.id = idRequest)
    response.status(200).send(filmeEncontrado)
}

const getFiltro = async (request, response) =>{
    let filmesJson = await dbConnect()
    let titleRequest = request.query.title.toLowerCase()
    let filmeEncontrado = filmesJson.filter(
    filme => filme.Title.toLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
}

const createMovie = async (request, response) =>{
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

}

const deletePorId = async (request, response) =>{
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

const putUpdateId = async (request, response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const bodyRequest = request.body
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    const indice = filmesJson.indexOf(filmeEncontrado)
    bodyRequest.id = idRequest
    filmesJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
    }])
}
const patchUpdateTitleid = async (request, response)=>{
    let filmesJson = await dbConnect()

    const idRequest = request.params.id
    const newTitle = request.body.Title
    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    filmeEncontrado.Title = newTitle

    response.status(200).json ([{
        "mensagem": "Titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado

    }])
}

const patchUpdateTitle = async (req, response)=>{
        let filmesJson = await dbConnect()
        const patchUpdateTitle = req.query.Titulo.toLowerCase();
        const novoTitulo = req.body.Title
        const filmeEncontrado = filmesJson.find(filme => filme.Title.toLowerCase().includes(patchUpdateTitle))

        filmeEncontrado.Title = novoTitulo

        response.status(200).json([{
            "mensagem":"Titulo atualizado com sucesso",
            filmeEncontrado

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