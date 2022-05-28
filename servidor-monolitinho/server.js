const ghibliJson = require("./data/ghibli.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (request, response)=>{
    response.status(200).json([
        {
            "mensagem":"API de filmes Ghibli"
        }
    ])
})


app.get("/ghibli/filmes", (request, response)=>{
    response.status(200).send(ghibliJson)
})



app.get("/ghibli/buscar/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)

})

app.get("/ghibli/filtro", (request, response)=>{
    let tituloRequest = request.query.titulo.toLowerCase()

    let filmeEncontrado = ghibliJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)

})


app.post("/ghibli/cadastrar", (request,response)=>{
    let bodyRequest = request.body

    let novoFilme = {
        id: (ghibliJson.length)+1, 
        title: bodyRequest.title, 
        description: bodyRequest.description 
    }
    ghibliJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
})

app.delete("/ghibli/deletar/:id", (request, response) => {
    const idRequest = request.params.id
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    
    // pegar o indice do filme que sera deletado
    const indice = ghibliJson.indexOf(filmeEncontrado)
    console.log(indice)

    //ARRAY.splice(INDICE, NUMERO DE ITENS QUE VC QUER DELETAR)
    ghibliJson.splice(indice,1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        ghibliJson
    }])
})

//metodo PUT que tem a função de substituir o dado
app.put("/ghibli/substituir/:id", (request, response) => {
    const idRequest = request.params.id
    const bodyRequest = request.body
    //encontrar o filme com o id enviado no request
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    
    //pegar o indice(posição no array) do meu filme que vai ser atualizado
    const indice = ghibliJson.indexOf(filmeEncontrado)
    
    //id enviado no body é o mesmo id enviado no path params
    //id enviado no body é o id do filme que vai ser atualizado
    bodyRequest.id = idRequest

    // deleta o filme existente e substitui
    ghibliJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        ghibliJson
    }])
})

//metodo PATCH que vai atualizar o titulo de um dado já existente
app.patch("/ghibli/updateTitulo/:id",  (request, response) => {
    const idRequest = request.params.id
    const newTitle = request.body.title

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    filmeEncontrado.title = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        ghibliJson
    }])
})

//FILMES



app.listen(3030, ()=>{
    console.log("alô, pepe moreno? to na porta 3030")
})