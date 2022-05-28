const app = require("./src/app") //chamando o arquivo app

const PORT = 3040 // porta

//inicia o servidor

app.listen(PORT, () => {
    console.log(`PORTA RODANDO ${PORT}`)
})