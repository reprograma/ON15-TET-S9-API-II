## Documentação Reprogramaflix

[GET] /filmes/catalogo
- retorna todos os filmes

[GET] /filmes/:id
- retorna um filme pelo id

[GET] /filmes?titulo:value
- retorna um filme pelo nome

[POST]/filmes/criar
- cria novo filmes

[DELETE]/filmes/deletar/:id
- deleta filme

[PUT]/filmes/update/:id
- atualiza um filme por inteiro

[PATCH]/filmes/updateTitle?id=value
- atualiza titulo

[PATCH]/filmes/update/:id
- atualiza o que vier no body

[GET] /series/catalogo
- retorna todos as series

[GET] /series/:id
- retorna uma serie pelo id

[GET] /series?titulo:value
- retorna uma serie pelo nome

[GET] /series?genero:value
- retorna uma serie pelo genero

[POST]/series/criar
- cria nova serie

[DELETE]/series/deletar/:id
- deleta serie

[PUT]/series/update/:id
- atualiza uma serie por inteiro

[PATCH]/series/updateTitle?id=value
- atualiza titulo

[PATCH]/series/update/:id
- atualiza o que vier no body
