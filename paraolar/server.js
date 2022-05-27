//confirgurando a porta e iniciando o servidor

//chamando o app
const app = require(".src/app")
const porta = 8080
app.listen(porta, ()=>{
    console.log(`Abre o portão que eu cheguei!!!`)
})