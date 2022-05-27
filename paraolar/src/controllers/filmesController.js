const bdConfig = require("../models/dbConfig")
async function bdConnect() {
    return await bdConfig.bancoDeDados("filmes")
}


async function getAll(request, response) {
    const filmes = await bdConnect()
    response.status(200).send(filmes)

}

async function getById(request, response) {
    try {
        const idRequest = request.params.id
        const filmes = await bdConnect()
        const filmeEncontrado = filmes.find(filme => filme.id == idRequest)
        if (filmeEncontrado == undefined) throw new Error("Não existe nenhum filme com esse Id")
        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(500).send(error.message)
    }


}

async function getByTitle(request, response) {
    try {
        const filmes = await bdConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let filmeEncontrado = filmes.filter(
            filme => filme.Title.toLowerCase().includes(tituloRequest))
        console.log(filmeEncontrado)
        if (filmeEncontrado.length == 0) throw new Error("Não existe nenhum filme com esse titulo")
        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(500).send(error.message)
    }

}


async function getByGenre(request, response) {
    try {
        const filmes = await bdConnect()
        let generoRequest = request.query.genero.toLowerCase()
        let filmeEncontrado = filmes.filter(
            filme => filme.Genre.toLowerCase().includes(generoRequest))
        if (filmeEncontrado.length == 0) throw new Error("Não existe nenhum filme com esse genero")
        response.status(200).send(filmeEncontrado)

    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function deleteById(request, response) {
    try {
        const idRequest = request.params.id
        const filmes = await bdConnect()
        const filmeEncontrado = filmes.find(filme => filme.id == idRequest)
        const indice = filmes.indexOf(filmeEncontrado)
        filmes.splice(indice, 1)
        if (filmeEncontrado == undefined) throw new Error("Não existe nenhum filme com ID")
        response.status(200).send("Filme excluido")
    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function createMovie(request, response) {
    const filmes = await bdConnect()
    const bodyRequest = request.body
    bodyRequest.id = parseInt((filmes[filmes.length - 1].id)) + 1
    filmes.push(bodyRequest)
    response.status(201).json([{
        "mensagem": "Filme Adicionado",
        bodyRequest
    }])
}

async function updateAll(request, response) {
    try {
        const filmes = await bdConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let filmeEncontrado = filmes.find(filme => filme.id == idRequest)
        bodyRequest.id = idRequest
        filmeEncontrado = bodyRequest
        if (filmeEncontrado == undefined) throw new Error("Não existe nenhum filme com ID")
        response.status(200).json([{
            "mensagem": "Filme alterado",
            filmeEncontrado
        }])

    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function update(request, response) {
    try {
        const filmes = await bdConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let filmeEncontrado = filmes.find(filme => filme.id == idRequest)
        if (filmeEncontrado == undefined) throw new Error("Não existe nenhum filme com ID")
        for (let item in bodyRequest) {
            filmeEncontrado[item] = bodyRequest[item]
        }
        response.status(200).json([{
            "mensagem": "Filme alterado",
            filmeEncontrado
        }])
    } catch (error) {
        response.status(500).send(error.message)
    }
}

async function updateTitle(request, response) {
    try {
        const filmes = await bdConnect()
        let titleRequest = request.query.titulo.toLowerCase()
        let bodyRequest = request.body
        let filmeEncontrado = filmes.find(filme => filme.Title.toLowerCase().includes(titleRequest))
        if (filmeEncontrado == undefined) throw new Error("Não existe nenhum filme com Titulo")
        for (let item in bodyRequest) {
            filmeEncontrado[item] = bodyRequest[item]
        }
        response.status(200).json([{
            "mensagem": "Filme alterado",
            filmeEncontrado
        }])
    } catch (error) {
        response.status(500).send(error.message)
    }

}


module.exports = {
    getAll,
    getById,
    getByTitle,
    createMovie,
    deleteById,
    getByGenre,
    updateAll,
    update,
    updateTitle
}