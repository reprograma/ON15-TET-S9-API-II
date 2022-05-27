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

        if(!filmeEncontrado) throw new Error("Filme não encontrado")
    
        response.status(200).send(filmeEncontrado)

    }catch(error){
        response.status(500).send({message:error.message})
        console.log(error)

    }
}
    

const searchTitle = async (request, response) => {

    try{
        let filmesJson = await dbConnect()

        let tituloRequest = request.query.titulo.toLowerCase()
    
        let filmeEncontrado = filmesJson.filter(
        filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(filmeEncontrado.length == 0) throw new Error("Filme não encontrado")
    
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
        
        response.status(200).json({
            message: "Filme cadastrado com sucesso.",
            newMovie: novoFilme
        })
    }catch(error){

        response.status(500).json({message:error.message})
        console.log(error) 
    }
}


const updateTitle = async (request, response) => {

    try{

        let filmesJson = await dbConnect()
    
        const idRequest = request.params.id
        const newTitle = request.body.Title
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        if(!filmeEncontrado) throw new Error("Filme não encontrado")

        filmeEncontrado.Title = newTitle

    
        response.status(200).json([{
            message: "Titulo atualizado com sucesso",
            updatedMovie: filmeEncontrado
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

const updateMovie = async (request, response) => {

    try{

        let filmesJson = await dbConnect()
    
        const idRequest = request.params.id
    
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        if(!filmeEncontrado) throw new Error("Filme não encontrado")

        const indice = filmesJson.indexOf(filmeEncontrado)
        filmesJson[indice] = request.body
    
        response.status(200).json([{
            message: "Filme atualizado com sucesso",
            updatedMovie: filmeEncontrado
        }])
        
    }catch(error){

        response.status(404).send({message:error.message})
        console.log(error) 
    }
}

const deleteMovie = async(request, response)=>{
    try{
        let filmesJson = await dbConnect()
        const idRequest = request.params.id
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        const indice = filmesJson.indexOf(filmeEncontrado)
    
        filmesJson.splice(indice, 1)

        if(!filmeEncontrado) throw new Error("Filme não encontrado")
    
        response.status(200).json([{
            message: "Filme deletado com sucesso",
            deletedMovie : filmeEncontrado
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
    createMovie,
    updateTitle,
    updateMovie,
    deleteMovie

}
