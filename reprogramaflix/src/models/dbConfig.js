//a models guarda a configuração do banco de dados
//bem como informações e "modelos"
//para a aula, simularemos um banco de dados "que demora"

function bancoDeDados(dado){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (dado == "series"){
                return resolve( require("./series.json"))
            }
            else if(dado == "filmes"){
                return resolve(require("./filmes.json"))
            }
            else{
                return reject("Dado não encontrado")
            }
            
        }, 2000);
    })
}
//exportando um função para outro arquivo
module.exports ={
    bancoDeDados
}