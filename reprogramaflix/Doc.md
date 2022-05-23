|  Método  |                  Rota                   |        Descrição         |
| :------: | :-------------------------------------: | :----------------------: |
|  `GET`   |         localhost:8099/assistir         |   Mensagem de entrada    |
|  `GET`   |   localhost:8099/filmes/catalogo        | Lista de todos os filmes |
|  `GET`   | localhost:8099/series/catalogo          | Lista de todas as séries |
|  `GET`   |    localhost:8099/filmes/buscar/:id     |   Buscar filme por ID    |
|  `GET`   |    localhost:8099/series/buscar/:id     |   Buscar série por ID    |
|  `GET`   | localhost:8099/filmes/filtro?titulo=    |  Buscar filme por título |
|  `GET`   | localhost:8099/series/filtro?titulo=    |  Buscar série por título |
|  `GET`   | localhost:8099/filmes/genero?Genre=     |  Buscar filme por gênero |
|  `GET`   | localhost:8099/series/genero?genre=     |  Buscar série por gênero |
|  `PUT`   | localhost:8099/filmes/substituir/:id    |  Atualizar filme inteiro |
|  `PUT`   | localhost:8099/series/substituir/:id    |  Atualizar série inteira |
|  `POST`  |     localhost:8099/filmes/cadastrar     |   Cadastrar novo filme   |
|  `POST`  |     localhost:8099/series/cadastrar     |   Cadastrar nova série   |
| `PATCH`  | localhost:8099/filmes/updateTitulo/:id  |   Atualizar título do filme  |
| `PATCH`  |localhost:8099/series/updateTitulo/:id   |   Atualizar título da série   |
| `PATCH`  | localhost:8099/filmes/updateItens/:id   |   Atualizar qualquer item do filme  |
| `PATCH`  |localhost:8099/series/updateItens/:id    |   Atualizar qualquer item da série  |
| `DELETE` |    localhost:8099/filmes/delete/:id     |   Deletar filme por ID   |
| `DELETE` |    localhost:8099/series/delete/:id     |   Deletar série por ID   |