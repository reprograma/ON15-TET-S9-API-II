const app = require("./src/app") //chamando o arquivo app

const PORT = 8889 // porta

//inicia o servidor
app.listen(PORT, ()=>{
    console.log(`Meu servidor está rodando na porta ${PORT}`)
})

