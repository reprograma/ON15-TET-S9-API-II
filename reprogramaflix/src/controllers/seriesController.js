//logica da nossa API
//chamar a o banco
const dbConfig = require("../models/dbConfig")

//executei a conexão do banco de dados
async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//getAll retorna todos os filmes
//filmes/catalogo/:id

const getAll = async (request, response) =>{
        let seriesJson = await dbConnect()
        response.status(200).send(seriesJson)
 }

module.exports = {
    getAll
}