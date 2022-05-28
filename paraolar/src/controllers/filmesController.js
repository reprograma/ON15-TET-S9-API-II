
const dbConfig = require("../models/dbConfig")              // IMPORTAR ARQUIVO QUE SIMULA O BANCO DE DADOS

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes")             // CHAMAR BANCO DE DADOS
}

// TODOS OS FILMES
const getAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        response.status(200).send({ "Catálogo de filmes": filmesJson })


    } catch (error) {
        response.status(500).send({ error: "Não foi possível exibir o catálogo de filmes." })
    }
}

// FILMES POR ID
const getByID = async (request, response) => {
    try{
        //conecta no banco de dados    
        let filmesJson = await dbConnect()
    
        let idRequest = request.params.id //peguei id enviado na request
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    
        if(filmeEncontrado == undefined) throw new Error("ID não encontrado")
        response.status(200).send({ "Filme encontrado com ID": filmeEncontrado })

    } catch (error){
        response.status(404).json({message: error.message})
    }
}

// FILMES POR TITULO
const getByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        let tituloRequest = request.query.titulo.toLowerCase()
        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(filmeEncontrado == 0) throw new Error("Não encontramos nenhum filme com o título digitado")
           
        response.status(200).json({ "Filme(s) encontrado(s) na busca": filmeEncontrado})

    } catch (error) {
        response.status(404).json({message: error.message})       
        
    }
}

// FILMES POR GÊNERO
const getByGenre = async (request, response) => {
    try{
       let filmesJson = await dbConnect()
       let generoRequest = request.query.genero.toLowerCase()
       let filmeEncontrado = filmesJson.filter(filme => filme.Genre.toLowerCase().includes(generoRequest))

       if(filmeEncontrado == 0) throw new Error("Não encontramos nenhum filme com o gênero digitado") 

       response.status(200).json({ "Filme(s) encontrado(s)": filmeEncontrado})

    } catch (error){
        response.status(404).json({message: error.message}) 
    }
    
}

//CADASTRAR FILME
const createMovie = async (request, response) => {
    try{
        let filmesJson =  await dbConnect()  
        let bodyRequest = request.body
    
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
        
        response.status(201).send({
            "Status da solicitação": "Novo filme cadastrado com sucesso",
            "Novo Filme" : novoFilme
        })
    } catch (error){
        response.status(500).json({ 
            error: "Novo cadastro falhou" })
    } 
}

//DELETAR FILME
const deleteByID = async (request, response) => {
    try{
        const filmesJson = await dbConnect()
        const idRequest = request.params.id
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        
        //PEGAR O INDICE DO FILME QUE SERÁ DELETADO
        const indice = filmesJson.indexOf(filmeEncontrado)
        console.log(indice)
        
        //ARRAY.splice(INDICE, NUMERO DE ITENS QUE VC QUER DELETAR)
        filmesJson.splice(indice,1)
        
        response.status(200).json([{
            "mensagem": "O filme foi deletado do catálogo com sucesso",
            "Filme Deletado": filmeEncontrado,
            filmesJson
        }])

    } catch (error) {
        response.status(500).json({error: "A exclusão do filme falhou" })
    }
}

//SUBSTITUIR TUDO (PASSANDO O ID NA REQUEST)
const updateAll = async (request, response) => {
    try {
        let filmesJson = await dbConnect()
        const idRequest = request.params.id
        const bodyRequest = request.body

        //ENCONTRAR O FILME COM O ID ENVIADO NA REQUEST
        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        //PEGAR O INDICE (POSIÇÃO NO ARRAY) DO MEU FILME QUE VAI SER ATUALIZADO
        const indice = filmesJson.indexOf(filmeEncontrado)

        //ID ENVIADO NO BODY É O MESMO ID ENVIADO NO PATH PARAMS
        //ID ENVIADO NO BODY É O ID DO FILME QUE VAI SER ATUALIZADO
        bodyRequest.id = idRequest

        filmesJson.splice(indice, 1, bodyRequest)

        if (filmeEncontrado == undefined) throw new Error("A substituição do filme falhou")

        response.status(200).json([{
            "Mensagem": "O filme foi substituído no catálogo com sucesso",
            "Filme atualizado":  bodyRequest
        }])

    } catch (error) {
        response.status(404).send({ message: error.message })
    }
}

//SUBSTITUIR TÍTULO (PASSANDO O ID NA REQUEST)
const updateTitle = async (request, response) => {
    try{
        let filmesJson = await dbConnect()
        let idRequest = request.params.id
        let bodyRequest = request.body.Title   //NOVO TÍTULO

        filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
        filmeEncontrado.Title = bodyRequest
        
        if (filmeEncontrado == undefined) throw new Error("A substituição do filme falhou")
        
        response.status(200).json(
        [{
            "mensagem" : "O Título do filme foi atualizado com sucesso", 
            "Filme atualizado": filmeEncontrado
        }])
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

//SUBSTITUIR QUALQUER ITEM (PASSANDO O ID NA REQUEST)
const updateItens = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        const idRequest = request.params.id
        const bodyRequest = request.body

        const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
       
        if (filmeEncontrado == undefined) throw new Error("Não foi possível atualizar o item escolhido do filme.");

        const itemEncontrado = Object.keys(bodyRequest);

        itemEncontrado.forEach(key => {
            filmeEncontrado[key] = bodyRequest[key];
        });

        response.status(200).json([{
            "Mensagem": "Item(s) do filme atualizado(s) com sucesso",
            "Filme atualizado": filmeEncontrado,
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
    createMovie,
    deleteByID,
    updateAll,
    updateTitle,
    updateItens
}
