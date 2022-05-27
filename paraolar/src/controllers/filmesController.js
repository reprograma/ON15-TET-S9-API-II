//////////////Lógica da API

//chamar o banco de dados
const dbConfig = require('../models/dbConfig')

//executei a conexão do banco de dados
async function dbConnect() {
  return await dbConfig.bancoDeDados('filmes')
}

//Criei minha função getAll para retornar todos os filmes
const getAll = async (request, response) => {
  let filmesJson = await dbConnect()
  response.status(200).send(filmesJson)
}

//função getById para retornar um filme pelo Id
const getById = async (request, response) => {
  let filmesJson = await dbConnect() //linha que conecta no BD

  let idRequest = request.params.id
  let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

  response.status(200).send(filmeEncontrado)
}

//função getByTitle pra retornar um filme pelo titulo
const getByTitle = async (request, response) => {
  let filmesJson = await dbConnect()

  let tituloRequest = request.query.titulo.toLowerCase()

  let filmeEncontrado = filmesJson.filter(filme =>
    filme.Title.toLowerCase().includes(tituloRequest)
  )

  response.status(200).send(filmeEncontrado)
}

//função createMovie para criar novo filme
const createMovie = async (request, response) => {
  let filmesJson = await dbConnect()

  let bodyRequest = request.body

  let novoFilme = {
    id: filmesJson.length + 1,
    Title: bodyRequest.Title,
    Plot: bodyRequest.Plot
  }
  filmesJson.push(novoFilme)

  response.status(201).send({
    mensagem: 'filmes cadastrado com sucesso',
    novoFilme
  })
}

//função deleteById para deletar filme
const deleteById = async (request, response) => {
  let filmesJson = await dbConnect()

  const idRequest = request.params.id
  const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

  const indice = filmesJson.indexOf(filmeEncontrado)
  console.log(indice)

  filmesJson.splice(indice, 1)

  response.status(200).json([
    {
      mensagem: 'filme deletado com sucesso',
      'filme-deletado': filmeEncontrado,
      filmesJson
    }
  ])
}

//função updateAll para atualizar um filme por inteiro
const updateAll = async (request, response) => {
  let filmesJson = await dbConnect()

  const idRequest = request.params.id
  const bodyRequest = request.body
  const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
  const indice = filmesJson.indexOf(filmeEncontrado)
  bodyRequest.id = idRequest

  filmesJson.splice(indice, 1, bodyRequest)

  response.status(200).json([
    {
      mensagem: 'filme atualizado com sucesso',
      'filme-atualizado': bodyRequest,
      filmesJson
    }
  ])
}

//função updateTitle para atualizar somente titulo de um filme
const updateTitle = async (request, response) => {
  let filmesJson = await dbConnect()

  const idRequest = request.params.id
  const newTitle = request.body.Title

  const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

  filmeEncontrado.Title = newTitle

  response.status(200).json([
    {
      mensagem: 'titulo atualizado com sucesso',
      'filme-atualizado': filmeEncontrado,
      filmesJson
    }
  ])
}

//função updateBody para atualizar o que vier no body
const updateBody = async (request, response) => {
  let filmesJson = await dbConnect()

  const idRequest = request.params.id
  const bodyRequest = request.body

  const filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

  const chavesRequest = Object.keys(bodyRequest)

  chavesRequest.forEach(key => {
    filmeEncontrado[key] = bodyRequest[key]
  })

  response.status(200).json([
    {
      Mensagem: 'Filme atualizado com sucesso',
      'Filme atualizado': filmeEncontrado,
      'Catálogo de filmes': filmesJson
    }
  ])
}

//exportando cada função pra ser usada nas routers
module.exports = {
  getAll,
  getById,
  getByTitle,
  createMovie,
  deleteById,
  updateAll,
  updateTitle,
  updateBody
}