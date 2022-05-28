const bancoDb = require("../database/dbConfig")


async function connect() {
    const Filmes = bancoDb.bancoDeDados("filmes")
    return await Filmes
}


const getAll = async (req, res) => {
    try {
        const Filmes = await connect();
    res.status(200).json({
        "mensagem": "Lista de todos os filmes:",
        Filmes
    })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const Filmes = await connect();
        const buscarPorId = req.params.id //vem do caminho do postman (client).

        const encontrarFilme = Filmes.find(filme => filme.id == buscarPorId)

        res.status(200).json({
            "mensagem": "Filmes encontrado:",
            encontrarFilme
        })
        
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const getByTitle = async (req, res) => {
    try {
        const Filmes = await connect();
        const buscarPorTitulo = req.query.titulo.toLowerCase();

        const buscarFilmePorTitulo = Filmes.filter(filmes => filmes.Title.toLowerCase().includes(buscarPorTitulo));

        res.status(200).json({
            "mensagem": "Filme encontrado:",
            buscarFilmePorTitulo
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }


}

const createFilmes = async (req, res) => {
    try {
        const Filmes = await connect();
        const criarFilmeBody = req.body // vem do corpo (body) do postman (client).

        const novoFilme = {
            id: Filmes.length + 1,
            Title: criarFilmeBody.Title,
            Genre: criarFilmeBody.Genre
        }

        Filmes.push(novoFilme);

        res.status(201).json({
            "mensagem": "Novo filme cadastrado:",
            novoFilme
        })

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const atualizarFilmes = async (req, res) => {
    try {
        const Filmes = await connect();
        const buscarPorId = req.params.id
        const atualizarPorBody = req.body

        const filmeEncontrado = Filmes.find(filme => filme.id == buscarPorId);

        const acharIndice = Filmes.indexOf(filmeEncontrado)

        atualizarPorBody.id = buscarPorId

        Filmes.splice(acharIndice, 1, atualizarPorBody);

        res.status(200).json({
            "mensagem": "Filme atualizado com sucesso!",
            atualizarPorBody
        })
        
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const atualizarPorId = async (req, res) => {
    try {
        const Filmes = await connect();
        const buscaId = req.params.id
        const novoTitulo = req.body.Title

        const filmeEncontrado = Filmes.find(filme => filme.id == buscaId);

        filmeEncontrado.Title = novoTitulo

        res.status(200).json({
            "mensagem": "Titulo atualizado com sucesso.",
            filmeEncontrado,
            "Novo Titulo": novoTitulo
        })

        
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const atualizarPorTitulo = async (req, res) => {
    try {
        const Filmes = await connect();
        const atualizaTitulo = req.query.titulo.toLowerCase();
        const novoTitulo = req.body.Title

        const buscarFilmePorTitulo = Filmes.filter(filmes => filmes.Title.toLowerCase().includes(atualizaTitulo));
        
        buscarFilmePorTitulo.forEach(element => {
            element.Title = novoTitulo
        });

        res.status(200).json({
            "mensagem": "Titulo atualizado",
            buscarFilmePorTitulo,
            "Novo titulo": novoTitulo
        })
        
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const deletarPorId = async (req, res) => {
    try {
        const Filmes = await connect();
        const buscaId = req.params.id

        const filmeEncontrado = Filmes.find(filme => filme.id == buscaId);
        const acharIndice = Filmes.indexOf(filmeEncontrado)

        Filmes.splice(acharIndice, 1);

        res.status(200).json({
            "mensagem": "Filme deletado com sucesso",
            "O filme deletado foi": filmeEncontrado
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    createFilmes,
    atualizarFilmes,
    atualizarPorId,
    atualizarPorTitulo,
    deletarPorId
}