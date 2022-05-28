function bancoDeDados(dado){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (dado == "series"){
                return resolve(require("../model/series.json"));
            }
            else if(dado == "filmes"){
                return resolve(require("../model/filmes.json"));
            }
            else{
                return reject("Banco de dado inexistente.")
            }
            
        }, 2000);
    })
}

module.exports = {
    bancoDeDados
}