
[GET] /filmes/catalogo        OK
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
- título de atualização

[PATCH]/filmes/update/:id
- atualização o que vier no body

---------------------------------------------
[GET] /series/catalogo
- retorna todos como series

[GET] /series/:id
- retorna uma serie pelo id

[GET] /series?titulo:valor
- retorna uma serie pelo nome

[GET] /series?genero:value
- retorna uma serie pelo genero

[POST]/série/criar
- série cria nova

[DELETE]/series/deletar/:id
- série deleta

[PUT]/series/update/:id
- atualiza uma serie por inteiro

[PATCH]/series/updateTitle?id=value
- título de atualização

[PATCH]/series/update/:id
- atualização o que vier no body