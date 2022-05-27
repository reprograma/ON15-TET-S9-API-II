//responsável somente por subir a info
const app = require("./src/app") //chamando o arquivo app (q tem todas as portas)

const PORT = 7070

//inicia o servidor
app.listen(PORT, ()=>{
    console.log(`Alô amor, estou ligando aqui da porta ${PORT}`)
})