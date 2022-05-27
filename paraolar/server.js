//const express = require("express")
//const app = express()

const app = require("./src/app")

const PORT = 5050

app.listen(PORT, ()=> {
    console.log(`Hi, you're in the door ${PORT}`)
})

