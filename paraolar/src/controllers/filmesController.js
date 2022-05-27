// IMPORTAR "BANCO DE DADOS"
const dbConfig = require("../models/dbConfig");

// CHAMANDO BANCO DE DADOS - CONDICIONAL "FILMES"
async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
};

// ENVIA TODOS OS FILMES
const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        response.status(200).send({ "Catálogo de filmes": filmesJson });


    } catch (error) {
        response.status(500).send({ error: "Não foi possível exibir o catálogo de filmes. Por favor, tente novamente mais tarde" });
    }
};

// BUSCAR FILMES POR ID
const getByID = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        let idRequest = request.params.id

        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);


        if (filmeEncontrado == undefined) throw new Error("Não foi possível exibir filme: ID não encontrado");
        response.status(200).send({ "Filme encontrado": filmeEncontrado });

    }
    catch (error) {
        response.status(404).send({ message: error.message });
    }

};

// BUSCAR FILMES POR TITULO
const getByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        let tituloRequest = request.query.titulo.toLowerCase();

        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest));

        if (filmeEncontrado == 0) throw new Error("Não foi possível encontrar filmes com o título pesquisado.");
        response.status(200).send({ "Filme(s) encontrado(s)": filmeEncontrado });

    }
    catch (error) {
        response.status(404).send({ message: error.message });


    }

};

// BUSCAR FILMES POR GENERO
const getByGenre = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        let generoRequest = request.query.Genre.toLowerCase();
        let generoEncontrado = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest));

        if (generoEncontrado == 0) throw new Error("Não foi possível encontrar filmes com o gênero pesquisado");

        response.status(200).send({ "Filme(s) encontrado(s)": generoEncontrado });

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// CADASTRAR NOVO FILME
const createMovie = async (request, response) => {
    try {
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
            "Mensagem": "Filme cadastrado com sucesso",
            "Novo filme": novoFilme,
            "Catálogo de filmes": filmesJson
        });



    } catch (error) {
        response.status(500).send({ error: "Não foi possível cadastrar novo filme. Por favor, tente novamente mais tarde." });
    }

};

// DELETAR FILME POR ID
const deleteByID = async (request, response) => {
    try {
        let filmesJson = await dbConnect();

        let idRequest = request.params.id

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        const indice = filmesJson.indexOf(filmeEncontrado)
        let filmeRemovido = filmesJson.splice(indice, 1);

        if (filmeEncontrado == undefined) throw new Error("Não foi possível deletar filme: ID não encontrado");

        response.status(200).send({
            "Mensagem": "Filme deletado com sucesso",
            "Filme deletado": filmeRemovido,
            "Catálogo de filmes": filmesJson

        });

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR UM ITEM INTEIRO
const updateAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);

        const indice = filmesJson.indexOf(filmeEncontrado);

        bodyRequest.id = idRequest

        filmesJson.splice(indice, 1, bodyRequest);

        if (filmeEncontrado == undefined) throw new Error("Não foi possível atualizar filme: ID não encontrado");

        response.status(200).json([{
            "Mensagem": "Filme atualizado com sucesso",
            "Filme atualizado": bodyRequest,
            "Catálogo de filmes": filmesJson
        }]);
    } catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR TITULO
const updateTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        const idRequest = request.params.id
        const newTitle = request.body.Title

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);

        if (filmeEncontrado == undefined) throw new Error("Não foi possível atualizar título do filme requisitado: ID não encontrado");

        filmeEncontrado.Title = newTitle


        response.status(200).json([{
            "Mensagem": "Título atualizado com sucesso",
            "Filme atualizado": filmeEncontrado,
            "Catálogo de filmes": filmesJson
        }]);

    }
    catch (error) {
        response.status(404).send({ message: error.message });
    }
};

// ATUALIZAR QUALQUER ITEM DO FILME
const updateItems = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
        if (filmeEncontrado == undefined) throw new Error("Não foi possível atualizar o campo escolhido do filme requisitado: ID não encontrado");

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            filmeEncontrado[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Filme atualizado com sucesso",
            "Filme atualizado": filmeEncontrado,
            "Catálogo de filmes": filmesJson
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
    createMovie,
    deleteByID,
    updateAll,
    updateTitle,
    updateItems
};
