//dbConnfig chama json de filmes
const listaDeFilmes = require("./filmes.json")


function bancoDeDados(dados){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dados == "filmes") {
                return resolve(listaDeFilmes)
                
            } else {
               return reject("Não foi possível localizar os dados")
            }
        }, 3000);
      
    })
}

module.exports = {bancoDeDados}