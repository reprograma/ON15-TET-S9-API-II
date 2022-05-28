const bancoDb = require("../database/dbConfig")


async function connect() {
    const Series = bancoDb.bancoDeDados("series")
    return await Series
}


const getAll = async (req, res) => {
    try {
        const Series = await connect();
    res.status(200).json({
        "mensagem": "Lista de todas as series:",
        Series
    })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const Series = await connect();
        const buscarPorId = req.params.id //vem do caminho do postman (client).

        const encontrarSerie = Series.find(serie => serie.id == buscarPorId)

        res.status(200).json({
            "mensagem": "Series encontrado:",
            encontrarSerie
        })
        
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const getByTitle = async (req, res) => {
    try {
        const Series = await connect();
        const buscarPorTitulo = req.query.titulo.toLowerCase();

        const buscarSeriePorTitulo = Series.filter(series => series.Title.toLowerCase().includes(buscarPorTitulo));

        res.status(200).json({
            "mensagem": "Filme encontrado:",
            buscarSeriePorTitulo
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }


}

const createSerie = async (req, res) => {
    try {
        const Series = await connect();
        const criarSerieBody = req.body // vem do corpo (body) do postman (client).

        const novaSerie = {
            id: Series.length + 1,
            Title: criarSerieBody.Title,
            Genre: criarSerieBody.Genre
        }

        Series.push(novaSerie);

        res.status(201).json({
            "mensagem": "Nova Serie cadastrada:",
            novaSerie
        })

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const atualizarSerie = async (req, res) => {
    try {
        const Series = await connect();
        const buscarPorId = req.params.id
        const atualizarPorBody = req.body

        const serieEncontrada = Series.find(filme => filme.id == buscarPorId);

        const acharIndice = Series.indexOf(serieEncontrada)

        atualizarPorBody.id = buscarPorId

        Series.splice(acharIndice, 1, atualizarPorBody);

        res.status(200).json({
            "mensagem": "Serie atualizada com sucesso!",
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
        const Series = await connect();
        const buscaId = req.params.id
        const novoTitulo = req.body.Title

        const serieEncontrada = Series.find(serie => serie.id == buscaId);

        serieEncontrada.Title = novoTitulo

        res.status(200).json({
            "mensagem": "Titulo atualizado com sucesso.",
            serieEncontrada,
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
        const Series = await connect();
        const atualizaTitulo = req.query.titulo.toLowerCase();
        const novoTitulo = req.body.Title

        const buscarSeriePorTitulo = Series.filter(filmes => filmes.Title.toLowerCase().includes(atualizaTitulo));
        
        buscarSeriePorTitulo.forEach(element => {
            element.Title = novoTitulo
        });

        res.status(200).json({
            "mensagem": "Titulo atualizado",
            buscarSeriePorTitulo,
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
        const Series = await connect();
        const buscaId = req.params.id

        const serieEncontrada = Series.find(filme => filme.id == buscaId);
        const acharIndice = Series.indexOf(serieEncontrada)

        Series.splice(acharIndice, 1);

        res.status(200).json({
            "mensagem": "Série deletada com sucesso",
            "O filme deletado foi": serieEncontrada
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
    createSerie,
    atualizarSerie,
    atualizarPorId,
    atualizarPorTitulo,
    deletarPorId
}