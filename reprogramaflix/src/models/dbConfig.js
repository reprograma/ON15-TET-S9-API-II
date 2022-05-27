//arquivo que simula o banco de dados
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

//exporta arquivo pra outra pasta
module.exports ={
    bancoDeDados
}