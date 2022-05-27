const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

//series/catalogo
const getAll = async(req, res)=>{
    try {
        let seriesJson = await dbConnect()
        
        if(seriesJson == undefined) throw new Error("arquivo não encontrado!")
        
        res.status(200).send(seriesJson)
        
    } catch (error) {
        res.status(404).json({message: error.message})       
        
    }
}

//series/catalogo/:id
const getById = async (request, response)=>{
    try {
        let seriesJson = await dbConnect()
        let idRquest = request.params.id //pegar o id enviado na request
        let serieEncontrada = seriesJson.find(serie => serie.id == idRquest)
    
        if(filmeEncontrado == undefined) throw new Error("id não encontrado!")
    
        response.status(200).send(serieEncontrada)
        
    } catch (error) {
        response.status(404).json({message: error.message})       
    }
}

//series/pesquisar
const getValue = async (req, res)=>{
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = req.query.title.toLowerCase()
        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(serieEncontrada == 0) throw new Error("titulo não encontrado!")
            
            res.status(200).json(serieEncontrada)

    } catch (error) {
        res.status(404).json({message: error.message})               
    }
}

//series/cadastrar
const createSerie = async(req, res)=>{
    try {
        let seriesJson = await dbConnect()
        let bodyRequest = req.body
        let novaSerie = {
            id: (seriesJson.length) +1,
            title: bodyRequest.title,
            totalSeasons: bodyRequest.totalSeasons,
            genre: bodyRequest.genre,
            writers: bodyRequest.writers,
            poster: bodyRequest.poster,
            actors: bodyRequest.actors,
            ratings: {
                rating: bodyRequest.rating,
                likes: bodyRequest.likes
            } 
        }

        const chaves = Object.keys(novaSerie)
        let serieValida = true
        
        chaves.forEach(key => {
            if(novaSerie[key] == null || novaSerie[key] == undefined) {
                serieValida = false
            }
        })
        seriesJson.push(novaSerie)

        if(!serieValida) throw new Error("Filme não foi validado")
        
        res.status(201).send({
            "mensagem": "Serie cadastrada com sucesso",
            novaSerie
        })
    
        
    } catch (error) {
        res.status(400).json({message: error.message}) 
    }
}

//series/titulo/:id
const updateTitle = async(req,res)=>{
    try {
        let seriesJson = await dbConnect()
        const idRequest = req.params.id        
        const novoTitulo = req.body.title   
        
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        serieEncontrada.title = novoTitulo
        
        if(novoTitulo == 0) throw new Error("Titulo não atualizado")
        
        res.status(200). json([{
            "mensagem": "titulo atualizado com sucesso",
            "serie-atualizada" : serieEncontrada,
            seriesJson 
        }])
        
    } catch (error) {

        res.status(405).json({message: error.message})    
        
    }

}

//series/alterar/:id
const updateSerie = async(req, res)=> {
    try {
        let seriesJson = await dbConnect()
        const idRequest = req.params.id
        const bodyRequest = req.body     
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        if(bodyRequest != idRequest) throw new Error("Serie não atualizada")

        const itemEncontrado = Object.keys(bodyRequest)

        itemEncontrado.forEach(key => {
        serieEncontrada[key] = bodyRequest[key]
    })
       
        res.status(200). json([{
            "mensagem": "serie atualizado com sucesso",
            "serie-atualizada": serieEncontrada,
            seriesJson 
        }])
        
    } catch (error) {

        res.status(405).json({message: error.message})       
        
    }

}

//filmes/substituir/:id
const changeAll = async(request, response)=> {
    try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id 
        const bodyRequest = request.body 

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)        
        
        const indice = seriesJson.indexOf(serieEncontrada) 
        
        bodyRequest.id = idRequest       
        
        seriesJson.splice(indice, 1, bodyRequest)

        //se id não localizado
        if(serieEncontrada == undefined) throw new Error ("Serie não localizada")     
    
        response.status(200). json([{
            "mensagem": "serie substituida com sucesso", 
            "serie-atualizada" : seriesJson 
        }])

        
    } catch (error) {

        response.status(404).json({message: error.message})       

        
    }
}
//filmes/deletar/:id
const deleteAll = async(request, response)=> {
    try {
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    
        const indice = seriesJson.indexOf(serieEncontrada)
    
        seriesJson.splice(indice, 1)

        //se id não localizado
        if(serieEncontrada == undefined) throw new Error ("Id não incluso no sistema") 
    
        response.status(200). json([{
            "mensagem": "serie deletada com sucesso",
            "serie-deletada" : serieEncontrada,
            seriesJson 
        }])
        
    } catch (error) {
        response.status(405).json({message: error.message})       
        
    }

}

module.exports = {
    getAll,
    getById,
    getValue,
    createSerie,
    updateTitle,
    updateSerie,
    changeAll,
    deleteAll
}