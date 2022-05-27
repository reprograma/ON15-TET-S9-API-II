const dbConfig = require("../models/dbConfig.js")


async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}


const getAll = async (request, response) =>{
    try{

        let filmesJson = await dbConnect()
        response.status(200).json(filmesJson)

    }catch(error){
        response.status(500).json({message:error.message})
        
    }
}

const getById = async (request, response)=>{

    try{
        let filmesJson = await dbConnect()
    
        let idRequest = request.params.id
        
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")
    
        response.status(200).send(filmeEncontrado)

    }catch(error){
        response.status(500).send({message:error.message})
        console.log(error)

    }
}
    

const searchTitle = async (request, response) => {

    try{
        let filmesJson = await dbConnect()

        let tituloRequest = request.query.Title.toLowerCase()
    
        let filmeEncontrado = filmesJson.filter(
        filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(filmeEncontrado.length == 0) throw new Error("filme não encontrado")
    
        response.status(200).send(filmeEncontrado)

    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }

}


const searchGenre = async (request, response) => {

    try{

        let filmesJson = await dbConnect()
        let tituloRequest = request.query.Genre.toLowerCase()
    
        let filmeEncontrado = filmesJson.filter(
        filme => filme.Genre.toLowerCase().includes(tituloRequest))

        if(filmeEncontrado.length == 0) throw new Error("gerero não encontrado")
    
        response.status(200).send(filmeEncontrado)

    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }
    
}

const createMovie = async (request, response) => {

    try{
        
        let filmesJson = await dbConnect()
    
        let bodyRequest  = request.body
    
        let novoFilme = {
           
            id: (filmesJson.length)+1, 
            Title: bodyRequest.Title, 
            Year: bodyRequest.Year,
            Rated: bodyRequest.Rated,
            Released: bodyRequest.Released,
            Runtime: bodyRequest.Runtime,
            Genre: bodyRequest.Genre,
            Director: bodyRequest.Director,
            Writer: bodyRequest.Writer,
            Actors: bodyRequest.Actors,
            Plot: bodyRequest.Plot,
            Language: bodyRequest.Language,
            Country: bodyRequest.Country,
            Awards: bodyRequest.Awards

        }

        filmesJson.push(novoFilme)

      
        // const valores = Object.values(novoFilme)  // selecionar os valores dos objetos
        
        // let filmeValido = true  // comparativo do cadastro
        
        // valores.forEach(valor => {  // esta pegando os valores do objeto
        //     if(novoFilme[valor] == null || novoFilme[valor] == undefined){ // se o filme for vazio ou indefinido vai retornar falso
        //         filmeValido = false 
        //     }
        // })
        
    
        // if(!filmeValido) throw new Error("filme não pode ser cadastrado") // não valido

        filmesJson.push(novoFilme)
        
        response.status(201).json({
            "mensagem": "filmes cadastrado com sucesso",
            novoFilme
        })
    }catch(error){

        response.status(500).json({message:error.message})
        console.log(error) 
    }
}

const replaceById = async(request, response) => {

    try{

        let filmesJson = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        const indice = filmesJson.indexOf(filmeEncontrado)
    
        bodyRequest.id = idRequest
    
        filmesJson.splice(indice, 1, bodyRequest)

        if(filmeEncontrado == undefined) throw new Error("filme não substituido ")
    
        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            "filme-atualizado": bodyRequest,
            filmesJson
        }])
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}


const updateTitle = async (request, response) => {

    try{

        let filmesJson = await dbConnect()
    
        const idRequest = request.params.id
        const newTitle = request.body.Title
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        if(filmeEncontrado == undefined) throw new Error("item não alterado,pois o id não foi encontrado")

        filmeEncontrado.Title = newTitle

    
        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            "filme-atualizado": filmeEncontrado,
            filmesJson
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}


const updateYear = async (request, response) => {
    try{

        let filmesJson = await dbConnect()
        const idRequest = request.params.id
        const newYear = request.body.Year
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("item não alterado, pois o id não foi encontrado")
    
        filmeEncontrado.Year = newYear

        
    
        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            "filme-atualizado": filmeEncontrado,
            filmesJson
        }])
    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }
}

const excluir = async(request, response)=>{
    try{

        let filmesJson = await dbConnect()
        const idRequest = request.params.id
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        const indice = filmesJson.indexOf(filmeEncontrado)
    
        filmesJson.splice(indice, 1)

        if(filmeEncontrado == undefined) throw new Error("filme não excluído, pois não tem esse id")
    
        response.status(200).json([{
            "mensagem": "filme deletado com sucesso",
            "filme-deletado" : filmeEncontrado,
            filmesJson 
        }])
    }catch(error){

        response.status(500).send({message:error.message})
        console.log(error) 
    }
}



module.exports = {
    getAll,
    getById,
    searchTitle,
    searchGenre,
    createMovie,
    replaceById,
    updateTitle,
    updateYear,
    excluir

}
