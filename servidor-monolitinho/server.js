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

//subtituir o objeto localizando pelo id
app.put("/ghibli/substituir/:id", (request, response)=>{
    const idRequest = request.params.id //pegar id enviado no path params
    const bodyRequest = request.body //info que quer modificar no body

    //encontrar o filme com o id enviado no request
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //pegar o indice(posição no array) do meu filme que vai ser atualizado
    const indice = ghibliJson.indexOf(filmeEncontrado) 

    //mantém o número indicado na rota(path params), para que o id não se repita, pois é único
    bodyRequest.id = idRequest

    //deleta o filme existente e substitui
    ghibliJson.splice(indice, 1, bodyRequest)

    response.status(200). json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado" : ghibliJson 
    }])

})

//atualiza apenas o item solicitado no arquivo
app.patch("/ghibli/updateTitulo/:id", (req,res)=>{
    const idRequest = req.params.id
    const novoTitulo = req.body.title

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    filmeEncontrado.title = novoTitulo
    
    res.status(200). json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado" : filmeEncontrado,
        ghibliJson 
    }])

})


app.listen(3030, ()=>{
    console.log("alô, pepe moreno? to na porta 3030")
})