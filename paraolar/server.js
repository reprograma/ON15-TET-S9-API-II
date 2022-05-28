const app = require("./src/app");
const port = 8090;


app.listen(port, () => {
    console.log(`O meu servidor está dando close de garota na porta ${port}`);
});

app.get("/", (request, response)=>{
    response.status(200).json([
{
            "mensagem":"API de filmes Ghibli"
        }
    ])
})