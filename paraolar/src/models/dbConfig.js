async function bancoDeDados(dados) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(dados == "filmes"){
                return resolve(require("./filmes.json"))
            }
            else if (dados == "series"){
                return resolve(require("./series.json"))
            }
            else if (dados == "assistir"){
                return resolve(`API DE FILMES E SERIES 
                - ROTA PARA VER TODOS OS FILMES /FILMES
                -ROTA PARA VER TODAS AS SERIES /SERIES`)
            }
            else{
                return reject(console.log("Erro na pasta models"))
            }

        }, 2000)
    })
}

module.exports= {bancoDeDados}