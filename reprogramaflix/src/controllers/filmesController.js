// IMPORTAR "BANCO DE DADOS"
const dbConfig = require("../models/dbConfig");

// CHAMANDO BANCO DE DADOS - CONDICIONAL "FILMES"
async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
};

// ENVIA TODOS OS FILMES
const getAll = async (request, response) => {
    let filmesJson = await dbConnect();
    response.status(200).send(filmesJson);
};

// BUSCAR FILMES POR ID
const getByID = async (request, response) => {
    let filmesJson = await dbConnect();
    let idRequest = request.params.id

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
    response.status(200).send(filmeEncontrado);

};

// BUSCAR FILMES POR TITULO
const getByTitle = async (request, response) => {
    let filmesJson = await dbConnect();
    let tituloRequest = request.query.titulo.toLowerCase();

    let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest));

    response.status(200).send(filmeEncontrado);

};

// BUSCAR FILMES POR GENERO
const getByGenre = async (request, response) => {
    let filmesJson = await dbConnect();
    let generoRequest = request.query.Genre.toLowerCase();
    let generoEncontrado = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest));

    response.status(200).send(generoEncontrado);
};

// CADASTRAR NOVO FILME
const createMovie = async (request, response) => {
    let filmesJson = await dbConnect();
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

    };

    filmesJson.push(novoFilme);
    response.status(201).send({
        "mensagem": "Filme cadastrado com sucesso",
        novoFilme
    });

};

// DELETAR FILME POR ID
const deleteByID = async (request, response) => {
    let filmesJson = await dbConnect();

    let idRequest = request.params.id

    let indexOfFilme = filmesJson.findIndex(item => item.id == idRequest);

    let filmeRemovido = filmesJson.splice(indexOfFilme, 1);
    response.status(200).send({
        "mensagem": "Filme removido com sucesso",
        "filme-deletado": filmeRemovido,
        filmesJson

    });
};

// ATUALIZAR UM ITEM INTEIRO
const updateAll = async (request, response) => {
    let filmesJson = await dbConnect();
    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);

    const indice = filmesJson.indexOf(filmeEncontrado);

    bodyRequest.id = idRequest

    filmesJson.splice(indice, 1, bodyRequest);

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        "Filme-atualizado": bodyRequest,
        filmesJson
    }]);
};

// ATUALIZAR TITULO
const updateTitle = async (request, response) => {
    let filmesJson = await dbConnect();
    const idRequest = request.params.id
    const newTitle = request.body.Title

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);

    filmeEncontrado.Title = newTitle

    response.status(200).json([{
        "mensagem": "Título atualizado com sucesso",
        "Filme-atualizado": filmeEncontrado,
        filmesJson
    }]);
};

// ATUALIZAR QUALQUER ITEM DO FILME
const updateItems = async (request, response) => {
    let filmesJson = await dbConnect();
    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
    const itemEncontrado = Object.keys(bodyRequest);

    itemEncontrado.forEach(key => {
        filmeEncontrado[key] = bodyRequest[key];
    });

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        "Filme-atualizado": filmeEncontrado,
        filmesJson
    }]);
};

// EXPORTAR FUNÇÕES
module.exports = {
    getAll,
    getByID,
    getByTitle,
    getByGenre,
    createMovie,
    deleteByID,
    updateAll,
    updateTitle,
    updateItems
};
