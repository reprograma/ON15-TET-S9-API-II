let bdConfig = require("../models/dbConfig")
async function bdConnect() {
    return await bdConfig.bancoDeDados("series")
}


async function getAll(request, response) {
    const series = await bdConnect()
    response.status(200).send(series)

}

async function getById(request, response) {
    try {
        let idRequest = request.params.id
        const series = await bdConnect()
        let serieEncontrada = series.find(series => series.id == idRequest)
        if (serieEncontrada == undefined) throw new Error("Não existe nenhuma serie com esse Id")
        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function getByTitle(request, response) {
    try {
        const series = await bdConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let serieEncontrada = series.filter(
            series => series.title.toLowerCase().includes(tituloRequest))
        if (serieEncontrada.length == 0) throw new Error("Não existe nenhuma serie com esse titulo")
        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(500).send(error.message)
    }

}


async function getByGenre(request, response) {
    try {
        const series = await bdConnect()
        let generoRequest = request.query.genero.toLowerCase()
        let serieEncontrada = series.filter(element => {
            for (let i = 0; i < element.genre.length; i++) {
                if (element.genre[i].toLowerCase().includes(generoRequest)) {
                    return element
                }
            }
        })
        if (serieEncontrada.length == 0) throw new Error("Não existe nenhuma serie com esse genero")
        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function deleteById(request, response) {
    try {
        let idRequest = request.params.id
        const series = await bdConnect()
        let serieEncontrada = series.find(series => series.id == idRequest)
        let indice = series.indexOf(serieEncontrada)
        series.splice(indice, 1)
        if (serieEncontrada == undefined) throw new Error("Não existe nenhuma serie com esse Id")
        response.status(200).send("Serie excluida")
    } catch (error) {
        response.status(500).send(error.message)
    }

}

async function createSerie(request, response) {
    const series = await bdConnect()
    let bodyRequest = request.body
    bodyRequest.id = parseInt((series[series.length - 1].id)) + 1
    series.push(bodyRequest)
    response.status(201).json([{
        "mensagem": "Serie Adicionado",
        bodyRequest
    }])
}

async function updateAll(request, response) {
    try {
        const series = await bdConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let serieEncontrada = series.find(series => series.id == idRequest)
        bodyRequest.id = idRequest
        serieEncontrada = bodyRequest
        if (serieEncontrada == undefined) throw new Error("Não existe nenhuma serie com esse Id")
        response.status(200).json([{
            "mensagem": "Serie alterada",
            serieEncontrada
        }])
    } catch (error) {
        response.status(500).send(error.message)
    }
}

async function update(request, response) {
    try {
        const series = await bdConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body
        let serieEncontrada = series.find(series => series.id == idRequest)
        for (let item in bodyRequest) {
            serieEncontrada[item] = bodyRequest[item]
        }
        if (serieEncontrada == undefined) throw new Error("Não existe nenhuma serie com esse Id")
        response.status(200).json([{
            "mensagem": "Serie alterada",
            serieEncontrada
        }])
    } catch (error) {
        response.status(500).send(error.message)
    }
}

async function updateTitle(request, response) {
    try {
        const series = await bdConnect()
        let titleRequest = request.query.titulo.toLowerCase()
        let bodyRequest = request.body
        let serieEncontrada = series.find(series => series.Title.toLowerCase().includes(titleRequest))
        for (let item in bodyRequest) {
            serieEncontrada[item] = bodyRequest[item]
        }
        if (serieEncontrada == undefined) throw new Error("Não existe nenhuma serie com esse titulo")
        response.status(200).json([{
            "mensagem": "Serie alterada",
            serieEncontrada
        }])
    } catch (error) {
        response.status(500).send(error.message)
    }
}


module.exports = {
    getAll,
    getById,
    getByTitle,
    createSerie,
    deleteById,
    getByGenre,
    updateAll,
    update,
    updateTitle
}