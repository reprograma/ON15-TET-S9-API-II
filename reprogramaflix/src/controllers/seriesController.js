const dbConfig = require("../models/dbConfig")

async function dbConnect(){
    return await dbConfig.bancoDeDados("series")
}

const getAll = async(req, res)=>{
    let seriesJson = await dbConnect()
    res.status(200).send(seriesJson)
}

module.exports = {
    getAll
}