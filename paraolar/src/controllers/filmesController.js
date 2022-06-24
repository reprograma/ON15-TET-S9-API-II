const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("filmes")
}

//porta 4040

//filmes/catalogo - retorna todos os filmes (GET)
const getAll = async(req, res)=>{  
    try {
        let filmesJson = await dbConnect()

        if(filmesJson == undefined) throw new Error("arquivo não encontrado!")

        res.status(200).json(filmesJson)               
        
    } catch (error) {
        res.status(404).json({message: error.message})       

    }
        
}
//filmes/catalogo/:id - retorna filme pelo id (GET)
const getById = async (request, response)=>{
    try {
        let filmesJson = await dbConnect()
        let idRquest = request.params.id
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRquest)
        
        if(filmeEncontrado == undefined) throw new Error("id não encontrado!")

        response.status(200).json(filmeEncontrado)
        
    } catch (error) {
         
        response.status(404).json({message: error.message})       
    }
}
//filmes/pesquisar - encontrar filme pelo nome (GET)
const getValue = async (req, res)=>{
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = req.query.titulo.toLowerCase()
        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(filmeEncontrado == 0) throw new Error("titulo não encontrado!")
            
            res.status(200).json(filmeEncontrado)

    } catch (error) {
        res.status(404).json({message: error.message})       
        
    }
}

//filmes/cadastrar - criar novo filme (POST)
const createMovie = async(req, res)=>{
    try {
        let filmesJson = await dbConnect()
        let bodyRequest = req.body
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
        
        const chaves = Object.keys(novoFilme)
        let filmeValido = true
        
        chaves.forEach(key => {
            if(novoFilme[key] == null || novoFilme[key] == undefined) {
                filmeValido = false
            }
        })
        
        filmesJson.push(novoFilme)

        if(!filmeValido) throw new Error("Filme não foi validado")
        
        res.status(201).json({
                "mensagem": "filme cadastrado com sucesso",
                novoFilme
            })
        
    } catch (error) {
        res.status(400).json({message: error.message})       
        
    }

        
}

//filmes/titulo/:id - atualizar titulo do filme (PATCH)
const updateTitle = async(req,res)=>{
    try {
        let filmesJson = await dbConnect()
        const idRequest = req.params.id        
        const novoTitulo = req.body.Title   
        
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        filmeEncontrado.Title = novoTitulo
        
        if(novoTitulo == 0) throw new Error("Titulo não atualizado")
        
        res.status(200). json([{
            "mensagem": "titulo atualizado com sucesso",
            "filme-atualizado" : filmeEncontrado,
            filmesJson 
        }])
        
    } catch (error) {

        res.status(405).json({message: error.message})    
        
    }

}

//filmes/alterar/:id - atualizar o que vier no body (PATCH)
const updateMovie = async(req, res)=> {
    try {
        let filmesJson = await dbConnect()
        const idRequest = req.params.id
        const bodyRequest = req.body     
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        if(bodyRequest != idRequest) throw new Error("Filme não atualizado")
        
        const itemEncontrado = Object.keys(bodyRequest)
        
        itemEncontrado.forEach(key => {
            filmeEncontrado[key] = bodyRequest[key]
        })
        
        
        res.status(200). json([{
            "mensagem": "filme atualizado com sucesso",
            "filme-atualizado": filmeEncontrado,
            filmesJson 
        }])
        
    } catch (error) {

        res.status(405).json({message: error.message})       
        
    }

}

//filmes/substituir/:id - atualizar filme todo (PUT)
const changeAll = async(request, response)=> {
    try {
        const filmesJson = await dbConnect()
        const idRequest = request.params.id 
        const bodyRequest = request.body 

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)        
        
        const indice = filmesJson.indexOf(filmeEncontrado) 
        
        bodyRequest.id = idRequest       
        
        filmesJson.splice(indice, 1, bodyRequest)

        if(filmeEncontrado == undefined) throw new Error ("Filme não localizado")     
    
        response.status(200). json([{
            "mensagem": "filme substituido com sucesso", 
            "filme-atualizado" : filmesJson 
        }])

        
    } catch (error) {

        response.status(404).json({message: error.message})       

        
    }
}
//filmes/deletar/:id - deletar filme (DELETE)
const deleteAll = async(request, response)=> {
    try {
        const filmesJson = await dbConnect()
        const idRequest = request.params.id
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        const indice = filmesJson.indexOf(filmeEncontrado)
    
        filmesJson.splice(indice, 1)

        if(filmeEncontrado == undefined) throw new Error ("Id não incluso no sistema") 
    
        response.status(200).json([{
            "mensagem": "filme deletado com sucesso",
            "filme-deletado" : filmeEncontrado,
            filmesJson 
        }])
        
    } catch (error) {
        response.status(405).json({message: error.message})       
        
    }

}

module.exports = {
    getAll,
    getById,
    getValue,
    createMovie,
    updateTitle,
    updateMovie,
    changeAll,
    deleteAll
}