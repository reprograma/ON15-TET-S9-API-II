// IMPORTAR BANCO DE DADOS
const dbConfig = require("../models/dbConfig");


// CHAMANDO BANCO DE DADOS - CONDICIONAL "ASSISTIR"
async function dbConnect() {
    return await dbConfig.bancoDeDados("assistir");
};

// MENSAGEM DE ENTRADA
const getMessage = async (request, response) => {
    let mensagem = await dbConnect();
    response.status(200).send(mensagem);

};

// EXPORTAR FUNÇÕES
module.exports = {
    getMessage
};