//chamar o banco de dados
const dbConfig = require('../models/dbConfig')

//executei a conexão do banco de dados
async function dbConnect() {
  return await dbConfig.bancoDeDados('series')
}

//getAll retorna todas as series
const getAll = async (request, response) => {
  let seriesJson = await dbConnect()
  response.status(200).send(seriesJson)
}

//função getById para retornar uma serie pelo Id
const getById = async (request, response) => {
  let seriesJson = await dbConnect() //linha que conecta no BD

  let idRequest = request.params.id
  let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

  response.status(200).send(serieEncontrada)
}

//função getByTitle para retornar uma serie pelo titulo
const getByTitle = async (request, response) => {
  let seriesJson = await dbConnect()

  const tituloRequest = request.query.titulo.toLowerCase()

  let serieEncontrada = seriesJson.filter(serie =>
    serie.title.toLowerCase().includes(tituloRequest)
  )

  response.status(200).send(serieEncontrada)
}

//função getByGenre para retornar uma serie pelo genero
const getByGenre = async (request, response) => {
  let seriesJson = await dbConnect()

  let generoRequest = request.query.genre.toLowerCase()

  let generoEncontrado = seriesJson.filter(serie =>
    serie.genre.toString().toLowerCase().includes(generoRequest)
  )

  response.status(200).send(generoEncontrado)
}

//função createSerie para criar nova serie
const createSerie = async (request, response) => {
  let seriesJson = await dbConnect()

  let bodyRequest = request.body

  let novaSerie = {
    id: seriesJson.length + 1,
    title: bodyRequest.title,
    totalSeasons: bodyRequest.totalSeasons,
    genre: bodyRequest.genre
  }

  seriesJson.push(novaSerie)

  response.status(201).send({
    mensagem: 'Serie cadastrada com sucesso',
    novaSerie
  })
}

//função deleteById para deletar serie
const deleteById = async (request, response) => {
  let seriesJson = await dbConnect()

  const idRequest = request.params.id
  const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

  const indice = seriesJson.indexOf(serieEncontrada)
  console.log(indice)

  seriesJson.splice(indice, 1)

  response.status(200).json([
    {
      mensagem: 'serie deletada com sucesso',
      'serie-deletada': serieEncontrada,
      seriesJson
    }
  ])
}

//função updateAll para atualizar uma serie por inteiro
const updateAll = async (request, response) => {
  let seriesJson = await dbConnect()

  const idRequest = request.params.id
  const bodyRequest = request.body
  const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)
  const indice = seriesJson.indexOf(serieEncontrada)
  bodyRequest.id = idRequest

  seriesJson.splice(indice, 1, bodyRequest)

  response.status(200).json([
    {
      mensagem: 'serie atualizado com sucesso',
      'serie-atualizada': bodyRequest,
      seriesJson
    }
  ])
}

//função updateTitle para atualiza somente titulo de uma serie
const updateTitle = async (request, response) => {
  let seriesJson = await dbConnect()

  const idRequest = request.params.id
  const newTitle = request.body.title

  const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

  serieEncontrada.title = newTitle

  response.status(200).json([
    {
      mensagem: 'titulo atualizado com sucesso',
      'serie-atualizada': serieEncontrada,
      seriesJson
    }
  ])
}

//função updateBody para atualizar o que vier no body
const updateBody = async (request, response) => {
  let seriesJson = await dbConnect()

  const idRequest = request.params.id
  const bodyRequest = request.body

  const serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

  const chavesRequest = Object.keys(bodyRequest)

  chavesRequest.forEach(key => {
    serieEncontrada[key] = bodyRequest[key]
  })

  response.status(200).json([
    {
      Mensagem: 'serie atualizada com sucesso',
      'serie atualizada': serieEncontrada,
      'Catálogo de series': seriesJson
    }
  ])
}

module.exports = {
  getAll,
  getById,
  getByTitle,
  getByGenre,
  createSerie,
  deleteById,
  updateAll,
  updateTitle,
  updateBody
}