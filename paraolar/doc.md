## Documentação Reprogramaflix

[GET] /filmes/catalogo - ok
- retorna todos os filmes

[GET] /filmes/:id - ok
- retorna um filme pelo id

[GET] /filmes?titulo:value - ok
- retorna um filme pelo nome

[GET] /filmes?genero:value - ok
- retorna um filme pelo genero

[POST]/filmes/criar - ok
- cria novo filmes

[DELETE]/filmes/deletar/:id - ok
- deleta filme

[PUT]/filmes/update/:id - ok
- atualiza um filme por inteiro

[PATCH]/filmes/updateTitle?id=value - ok
- atualiza titulo

[PATCH]/filmes/update/:id - ok
- atualiza o que vier no body

[GET] /series/catalogo - ok
- retorna todos as series

[GET] /series/:id - ok
- retorna uma serie pelo id

[GET] /series?titulo:value - ok
- retorna uma serie pelo nome

[GET] /series?genero:value - ok
- retorna uma serie pelo genero

[POST]/series/criar - ok
- cria nova serie

[DELETE]/series/deletar/:id - ok
- deleta serie

[PUT]/series/update/:id - ok
- atualiza uma serie por inteiro

[PATCH]/series/updateTitle?id=value - ok
- atualiza titulo

[PATCH]/series/update/:id - ok
- atualiza o que vier no body
