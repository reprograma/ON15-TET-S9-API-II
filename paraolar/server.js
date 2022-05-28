const app = require("./src/app") //chamando o arquivo app

const PORT = 8080 // porta

//inicia o servidor
app.listen(PORT, ()=>{
    console.log(`A porta ${PORT} está funcionando!`)
})

