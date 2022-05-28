
const dbConfig = require("../models/dbConfig")              // IMPORTAR ARQUIVO QUE SIMULA O BANCO DE DADOS

async function dbConnect() {
    return await dbConfig.bancoDeDados("series")             // CHAMAR BANCO DE DADOS
}

// TODOS OS FILMES
const getAll = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        response.status(200).send({ "Catálogo de series": seriesJson })


    } catch (error) {
        response.status(500).send({ error: "Não foi possível exibir o catálogo de séries." })
    }
}

// SERIES POR ID
const getByID = async (request, response) => {
    try{
        //conecta no banco de dados    
        let seriesJson = await dbConnect()
    
        let idRequest = request.params.id //peguei id enviado na request
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
    
        if(serieEncontrada == undefined) throw new Error("id não encontrado")
        response.status(200).send({ "Série encontrada com ID": serieEncontrada })

    } catch (error){
        response.status(404).json({message: error.message})
    }
}

// SERIES POR TITULO
const getByTitle = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(serieEncontrada == 0) throw new Error("Não encontramos nenhum filme com o título digitado")
            
        response.status(200).json({ "Serie(s) encontrada(s) na busca": serieEncontrada})

    } catch (error) {
        response.status(404).json({message: error.message})       
        
    }
}

//SERIES POR GÊNERO
const getByGenre = async (request, response) => {
    try{
        let seriesJson = await dbConnect()
        let generoRequest = request.query.genero.toLowerCase()
        let serieEncontrada = seriesJson.filter(
            filme => filme.genre.toString().toLowerCase().includes(generoRequest))
 
        if(serieEncontrada == 0) throw new Error("Não encontramos nenhuma série com o gênero digitado") 
 
        response.status(200).json({ "Serie(s) encontrada(s)": serieEncontrada})
 
     } catch (error){
         response.status(404).json({message: error.message}) 
     }
}

//CADASTRAR SÉRIE
const createSerie = async (request, response) => {
    try{
        let seriesJson =  await dbConnect()  
        let bodyRequest = request.body
    
        let novaSerie = {
            id: (seriesJson.length) + 1,
            title: bodyRequest.title,
            totalSeasons: bodyRequest.totalSeasons,
            genre: bodyRequest.genre,
            writers: bodyRequest.writers,
            poster: bodyRequest.poster,
            actors: bodyRequest.actors,
            ratings: bodyRequest.ratings
        }

        seriesJson.push(novaSerie)
        
        response.status(201).send({
            "Status da solicitação": "Nova Série cadastrada com sucesso",
            "Nova Série" : novaSerie
        })
    } catch (error){
        response.status(500).json({ 
            error: "Novo cadastro falhou" });
    }
}

//DELETAR SERIE
const deleteByID = async (request, response) => {
    try{
        const seriesJson = await dbConnect()
        const idRequest = request.params.id
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        
        //PEGAR O INDICE DA SERIE QUE SERÁ DELETADA
        const indice = seriesJson.indexOf(serieEncontrada)
        console.log(indice)
        
        //ARRAY.splice(INDICE, NUMERO DE ITENS QUE VC QUER DELETAR)
        seriesJson.splice(indice,1)
        
        response.status(200).json([{
            "mensagem": "A série foi deletada do catálogo com sucesso",
            "Série Deletada": serieEncontrada,
            seriesJson
        }])

    } catch (error) {
        response.status(500).json({error: "A exclusão da série falhou" })
    }
}

//SUBSTITUIR TUDO (PASSANDO O ID NA REQUEST)
const updateAll = async (request, response) => {
    try {
        let seriesJson = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        //ENCONTRAR O FILME COM O ID ENVIADO NA REQUEST
        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

        //PEGAR O INDICE (POSIÇÃO NO ARRAY) DO MEU FILME QUE VAI SER ATUALIZADO
        const indice = seriesJson.indexOf(serieEncontrada)

        //ID ENVIADO NO BODY É O MESMO ID ENVIADO NO PATH PARAMS
        //ID ENVIADO NO BODY É O ID DO FILME QUE VAI SER ATUALIZADO
        bodyRequest.id = idRequest

        seriesJson.splice(indice, 1, bodyRequest)

        if (serieEncontrada == undefined) throw new Error("A substituição da série falhou")

        response.status(200).json([{
            "Mensagem": "A série foi substituída no catálogo com sucesso",
            "Série atualizada":  bodyRequest
        }])

    } catch (error) {
        response.status(404).send({ message: error.message })
    }
}

//SUBSTITUIR TÍTULO (PASSANDO O ID NA REQUEST)
const updateTitle = async (request, response) => {
    try{
        let seriesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body.title   //NOVO TÍTULO

        serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
        serieEncontrada.title = bodyRequest
        
        if (serieEncontrada == undefined) throw new Error("A substituição da série falhou")
        
        response.status(200).json(
        [{
            "mensagem" : "O Título da série foi atualizado com sucesso", 
            "Série atualizada":serieEncontrada
        }])
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}


const updateItens = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const serieEncontrada = seriesJson.find(serie => serie.id == idRequest);
        if (serieEncontrada == undefined) throw new Error("Não foi possível atualizar o item escolhido da série");

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            serieEncontrada[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Item(s) da série atualizado(s) com sucesso",
            "Série atualizada": serieEncontrada,
        }]);

    } catch (error) {
        response.status(404).send({ message: error.message });
    }
}


module.exports = {
    getAll,
    getByID,
    getByTitle,
    getByGenre,
    createSerie,
    deleteByID,
    updateAll,
    updateTitle,
    updateItens
}
