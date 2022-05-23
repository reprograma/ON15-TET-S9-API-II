const ghibliJson = require("./data/ghibli.json")
const filmesJson = require("/data/filmes.json")
const seriesJson = require("/data/series.json")

const express = require("express")
const cors = require("cors")
const { request } = require("http")
const { runInNewContext } = require("vm")

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

    app.delete("/ghibli/deletar/:id", (request, response)=>{
        const idRequest = request.params.id
        const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    
        const indice = ghibliJson.indexOf(filmeEncontrado)
    
        ghibliJson.splice(indice, 1)
    
        response.status(200). json([{
            "mensagem": "filme deletado com sucesso",
            "filme-deletado" : filmeEncontrado,
            ghibliJson 
        }])
    })
    
// PUT substitui tudo/ uSar metodo splace
//app.put("ghibli/substituir/:id",(request, response)=> {
   // const idRequest = request.params.id
    //const bodyRequest = request.body
    //const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    //const indice = ghibliJson.indexOf(filmeEncontrado)
    //console.log(ghibliJson.splice(indice, 1, bodyRequest))
//})

app.put("/ghibli/substituir/:id", (request, response) => {
    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
     bodyRequest.id = idRequest

    const indice = ghibliJson.indexOf(filmeEncontrado)
    ghibliJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest, ghibliJson
    }])
})

// PATCH substitui somente uma propriedade dentro do seu objeto
app.patch("/ghibli/updateTitulo/:id",(request, response)=>{
    const idRequest = request.params.id
    const newTitle = request.body.title

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
    filmeEncontrado.title = runInNewContext

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado, ghibliJson
    }])
})


app.listen(5055, ()=>{
    console.log("Olá estou rodando na porta 5055")
})