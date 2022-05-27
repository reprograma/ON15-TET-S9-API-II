// IMPORTAR "BANCO DE DADOS"
const dbConfig = require("../models/dbConfig");

// CHAMANDO BANCO DE DADOS - CONDICIONAL "SERIES"
async function dbConnect() {
    return await dbConfig.bancoDeDados("series");
};

// ENVIA TODAS AS SERIES
const getAll = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        response.status(200).send({ "Catálogo de séries": seriesJson });


    } catch (error) {
        response.status(500).send({ error: "Não foi possível exibir o catálogo de séries. Por favor, tente novamente mais tarde" });
    }
};

// BUSCAR SERIES POR ID
const getByID = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        let idRequest = request.params.id

        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest);

        if (serieEncontrada == undefined) throw new Error("Não foi possível exibir série: ID não encontrado");
        response.status(200).send({ "Série encontrada": serieEncontrada });

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// BUSCAR SERIES POR TITULO
const getByTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        let tituloRequest = request.query.titulo.toLowerCase();

        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest));
        if (serieEncontrada == 0) throw new Error("Não foi possível encontrar séries com o título pesquisado.");

        response.status(200).send({ "Série(s) encontrada(s)": serieEncontrada });

    }
    catch (error) {
        response.status(404).send({ message: error.message });

    }

}

// BUSCAR SERIES POR GENERO
const getByGenre = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        let generoRequest = request.query.genre.toLowerCase();

        let generoEncontrado = seriesJson.filter(serie => serie.genre.toString().toLowerCase().includes(generoRequest));
        if (generoEncontrado == 0) throw new Error("Não foi possível encontrar séries com o gênero pesquisado.");

        response.status(200).send({ "Série(s) encontrada(s)": generoEncontrado });

    } catch (error) {
        response.status(404).send({ message: error.message });
    }

};

// CADASTRAR NOVA SERIE
const createSerie = async (request, response) => {
    try {

        let seriesJson = await dbConnect();
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

        seriesJson.push(novaSerie);
        response.status(201).send({
            "Mensagem": "Série cadastrada com sucesso",
            "Nova série": novaSerie,
            "Catálogo de séries": seriesJson

        });

    } catch (error) {
        response.status(500).send({ error: "Não foi possível cadastrar nova série. Por favor, tente novamente mais tarde." });
    }

};

// DELETAR SERIE POR ID
const deleteByID = async (request, response) => {
    try {
        let seriesJson = await dbConnect();

        let idRequest = request.params.id

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest);
        const indice = seriesJson.indexOf(serieEncontrada);
        let serieRemovida = seriesJson.splice(indice, 1);

        if (serieEncontrada == undefined) throw new Error("Não foi possível deletar série: ID não encontrado");

        response.status(200).send({
            "Mensagem": "Série deletada com sucesso",
            "Série deletada": serieRemovida,
            "Catálogo de séries": seriesJson

        });
    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR UM ITEM INTEIRO
const updateAll = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest);

        const indice = seriesJson.indexOf(serieEncontrada);

        bodyRequest.id = idRequest

        seriesJson.splice(indice, 1, bodyRequest);

        if (serieEncontrada == undefined) throw new Error("Não foi possível atualizar série: ID não encontrado");

        response.status(200).json([{
            "Mensagem": "Série atualizada com sucesso",
            "Série atualizada": bodyRequest,
            "Catálogo de séries": seriesJson
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR TITULO
const updateTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        const idRequest = request.params.id
        const newTitle = request.body.title

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest);

        if (serieEncontrada == undefined) throw new Error("Não foi possível atualizar título da série requisitada: ID não encontrado");

        serieEncontrada.title = newTitle

        response.status(200).json([{
            "Mensagem": "Título atualizado com sucesso",
            "Série atualizada": serieEncontrada,
            "Catálogo de séries": seriesJson
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR QUALQUER ITEM DA SERIE
const updateItems = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest);
        if (serieEncontrada == undefined) throw new Error("Não foi possível atualizar o campo escolhido da série requisitada: ID não encontrado");

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            serieEncontrada[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Série atualizada com sucesso",
            "Série atualizada": serieEncontrada,
            "Catálogo de séries": seriesJson
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// EXPORTAR FUNÇÕES
module.exports = {
    getAll,
    getByID,
    getByTitle,
    getByGenre,
    createSerie,
    deleteByID,
    updateAll,
    updateTitle,
    updateItems
};
