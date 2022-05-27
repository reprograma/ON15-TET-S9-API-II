# ON15-TET-S9-API-III
Turma Online Todas em Tech - Back-end | Semana 9: Introdução à API: DELETE + PUT + PATCH

| `GET` | localhost:9050/assistir | Mensagem de entrada |
| `GET` | localhost:9050/filmes/catalogo | Lista de todos os filmes |
| `GET` | localhost:9050/series/catalogo | Lista de todas as séries |
| `GET` | localhost:9050/filmes/buscar/:id | Buscar filme por ID |
| `GET` | localhost:9050/series/buscar/:id | Buscar série por ID |
| `GET` | localhost:9050/filmes/filtro?titulo= | Buscar filme por título |
| `GET` | localhost:9050/series/filtro?titulo= | Buscar série por título |
| `GET` | localhost:9050/filmes/genero?Genre= | Buscar filme por gênero |
| `GET` | localhost:9050/series/genero?genre= | Buscar série por gênero |
| `PUT` | localhost:9050/filmes/substituir/:id | Atualizar filme inteiro |
| `PUT` | localhost:9050/series/substituir/:id | Atualizar série inteira |
| `POST` | localhost:9050/filmes/cadastrar | Cadastrar novo filme |
| `POST` | localhost:9050/series/cadastrar | Cadastrar nova série |
| `PATCH` | localhost:9050/filmes/updateTitulo/:id | Atualizar título do filme |
| `PATCH` |localhost:9050/series/updateTitulo/:id | Atualizar título da série |
| `PATCH` | localhost:9050/filmes/updateYear/:id | Atualizar qualquer item do filme |
| `PATCH` |localhost:9050/series/updateYear/:id | Atualizar qualquer item da série |
| `EXCLUIR` | localhost:9050/filmes/deletar/:id | Deletar filme por ID |
| `EXCLUIR` | localhost:9050/series/deletar/:id | Deletar série por ID |

router.get("/catalogo", controller.getAll)
router.get("/buscar/:id", controller.getById)
router.get("/filtrar", controller.searchTitle)
router.get("/genero", controller.searchGenre)
router.post("/cadastrar", controller.createMovie)
router.put("/substituir/:id", controller.replaceById)
router.patch("/updateTitulo/:id", controller.updateTitle)
router.patch("/updateYear/:id", controller.updateYear)
router.delete("/deletar", controller.excluir)
