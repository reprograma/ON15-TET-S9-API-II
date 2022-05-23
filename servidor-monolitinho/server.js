<<<<<<< HEAD
const ghibliJson = require("./data/ghibli.json");
=======
const ghibliJson = require("./data/ghibli.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())//body parser
>>>>>>> d7fd2eb411423ef73c1141bce9253dee1645f020


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// MENSAGEM INICIAL
app.get("/", (request, response) => {
    response.status(200).json([
        {
            "mensagem": "API de filmes Ghibli"
        }
    ]);
});

// TODOS OS FILMES
app.get("/ghibli/filmes", (request, response) => {
    response.status(200).send(ghibliJson);
});

// BUSCAR FILMES POR ID
app.get("/ghibli/buscar/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest);

    response.status(200).send(filmeEncontrado);

});

<<<<<<< HEAD
// BUSCAR FILMES POR TITULO
app.get("/ghibli/filtro", (request, response) => {
    let tituloRequest = request.query.titulo.toLowerCase();

    let filmeEncontrado = ghibliJson.filter(filme => filme.title.toLowerCase().includes(tituloRequest));
=======
app.get("/ghibli/filtro", (request, response)=>{
    //recebi o titulo enviado do query params
                                            //pra facilitar coloquei tudo minusculo
    let tituloRequest = request.query.titulo.toLowerCase()

    //filtro no ghibliJson 
    //procurando filmes que tenham o titulo PARECIDO com o titulo enviado na request
    let filmeEncontrado = ghibliJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))
>>>>>>> d7fd2eb411423ef73c1141bce9253dee1645f020

    response.status(200).send(filmeEncontrado);
});

// CADASTRAR NOVO FILME
app.post("/ghibli/cadastrar", (request, response) => {
    let bodyRequest = request.body

    let novoFilme = {
        id: (ghibliJson.length) + 1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    ghibliJson.push(novoFilme);

    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    });
});

<<<<<<< HEAD
// DELETAR FILME POR ID
app.delete("/ghibli/deletar/:id", (request, response) => {
    const idRequest = request.params.id
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest);
=======
app.delete("/ghibli/deletar/:id",(request, response) => {
    const idRequest = request.params.id
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //pegar o indice do filme que sera deletado
    const indice = ghibliJson.indexOf(filmeEncontrado)
    console.log(indice)

    //ARRAY.splice(INDICE, NUMERO DE ITENS Q VC QUER DELETAR)
    ghibliJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        ghibliJson
    }])

})
//metodo PUT que tem a função de substituir o dado
app.put("/ghibli/substituir/:id", (request, response) => {
    //pegar id enviado no path params
    const idRequest = request.params.id
    //pegar body enviado 
    const bodyRequest = request.body
    //encontrar o filme com o id enviado no request
    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //pegar o indice(posição no array) do meu filme que vai ser atualizado
    const indice = ghibliJson.indexOf(filmeEncontrado)

    //id enviado no body é o mesmo id enviado no path params 
    //id enviado no body é o id do filme q vai ser atualidado
    bodyRequest.id = idRequest

    //deleta o filme existente e substitui
    ghibliJson.splice(indice, 1, bodyRequest)

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        ghibliJson
    }])
})

//metodo PATCH que vai atualizar o titulo de um dado ja existente
app.patch("/ghibli/updateTitulo/:id", (request, response)=>{
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

>>>>>>> d7fd2eb411423ef73c1141bce9253dee1645f020

    const indice = ghibliJson.indexOf(filmeEncontrado);
    ghibliJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado": filmeEncontrado,
        ghibliJson
    }]);
});

// SUBSTITUIR TUDO
app.put("/ghibli/substituir/:id", (request, response) => {
    const idRequest = request.params.id
    const bodyRequest = request.body

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest);

    const indice = ghibliJson.indexOf(filmeEncontrado);

    bodyRequest.id = idRequest

    ghibliJson.splice(indice, 1, bodyRequest);

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        ghibliJson
    }]);
});

// ATUALIZAR TÍTULO
app.patch("/ghibli/updateTitulo/:id", (request, response) => {
    const idRequest = request.params.id
    const newTitle = request.body.title

    const filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest);

    filmeEncontrado.title = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        ghibliJson
    }]);
});

// LOCALHOST 
app.listen(3030, () => {
    console.log("alô, pepe moreno? to na porta 3030");
});