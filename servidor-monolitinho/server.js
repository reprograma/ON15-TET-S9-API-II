//chamando o Json que simula nosso banco de dados
const ghibliJson = require("./data/ghibli.json") //caminho dele

const express = require("express")
const cors = require("cors")

const app = express() //executando o express

app.use(cors())
app.use(express.json())//body parser
//linha que torna possível recer o body la do postman

app.get("/", (request, response)=>{
    response.status(200).json([
        {
            "mensagem":"API de filmes Ghibli"
        }
    ])
})

//rota de todos os filmes
app.get("/ghibli/filmes", (request, response)=>{
    response.status(200).send(ghibliJson)
})

//rota de busca filmes por id
app.get("/ghibli/buscar/:id", (request, response)=>{
    let idRequest = request.params.id //pegando o id enviado no request
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
//procurando o filme que é igual o id mandando no request
    response.status(200).send(filmeEncontrado)

})

app.get("/ghibli/filtro", (request, response)=>{
    //recebi o titulo enviado do query params
                                            //pra facilitar coloquei tudo minusculo
    let tituloRequest = request.query.titulo.toLowerCase()
 // o query é usado para pesquisas de multiplas strings
 //esse .titulo é o que entra no key do postman, tem que ser igual(afinal, é o request)
    //procurando filmes que tenham o titulo PARECIDO com o titulo enviado na request
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

//excluir um filme (antes de deletar eu preciso encontrar ele por id)
app.delete("/ghibli/deletar/:id",(request, response) => {
    const idRequest = request.params.id //peguei o que foi enviado no request
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
//percorrer o Json caçando item por item
    //pegar o indice do filme que sera deletado
    const indice = ghibliJson.indexOf(filmeEncontrado)
    console.log(indice)
// indice =/ ID
    //ARRAY.splice(INDICE, NUMERO DE ITENS Q VC QUER DELETAR)
    ghibliJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        ghibliJson //so para vermos como ficou depois do delete
    }])

})
//metodo PUT que tem a função de substituir,trocar o dado
app.put("/ghibli/substituir/:id", (request, response) => {
    //pegar do request o id do filme que eu quero atualizar
    const idRequest = request.params.id
    //pegar body enviado (com a info que vai entrar no lugar)
    const bodyRequest = request.body
    //encontrar o filme com o id enviado no request
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //pegar o indice(posição no array) do meu filme que vai ser atualizado
    const indice = ghibliJson.indexOf(filmeEncontrado)

//importante!!! pra não terem filmes com IDs iguais
    //id enviado no body é o id do filme q vai ser atualidado
    bodyRequest.id = idRequest

    //deleta o filme existente e substitui pelo body que coloquei
    ghibliJson.splice(indice, 1, bodyRequest) //(indice,deletei,coloquei no lugar)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        ghibliJson //só pra gente ver a nova lista de filmes
    }])
})

//metodo PATCH que vai atualizar o titulo de um dado ja existente
app.patch("/ghibli/updateTitulo/:id", (request, response)=>{
    const idRequest = request.params.id //pegar o titulo evidado no body
    const newTitle = request.body.title //esse .title é o do nosso data

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)
//filme cujo filme id seja igual o id enviado na request
    filmeEncontrado.title = newTitle //titulo do filme encontrado agr é newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        ghibliJson //so pra vermos se mudou
    }])

})


//abrindo a porta
app.listen(3030, ()=>{
    console.log("alô, pepe moreno? to na porta 3030")
})