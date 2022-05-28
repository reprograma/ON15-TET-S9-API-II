function bancoDeDados(dado){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (dado == "filmes"){
                return resolve( require("./filmes.json"))
            }
            else if(dado == "series"){
                return resolve(require("./series.json"))
            }
            else{
                return reject("Dado não encontrado!")
            }
        }, 2000);
    })
}

module.exports={
    bancoDeDados
}
