const { response } = require("express");
const dbConfig = require("../models/dbConfig");

async function dbConfigConnect() {
    return await dbConfig.bancoDeDados("series")
}
const getAll = async(request, response) => {
    let seriesJson = await dbConfigConnect()
    response.status(200).send(seriesJson)
}
module.exports = {
    getAll
}