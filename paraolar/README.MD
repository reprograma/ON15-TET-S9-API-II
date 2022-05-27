#Documentação
    Rotas para acessar a API.

- Filmes:
 ```bash
    GET-/filmes/assistir => Retorna todos os filmes .
	GET -/filmes/buscar/id => Retorna o filme do id digitado.
	GET - /filmes/buscar => Retorna o filme que possui o mesmo titulo digitado(digite no KEY titulo)
	GET - /filmes/filtrar => Retorna todos os filmes que possui o genero digitado (digite no KEY genero)
	DELETE - /filmes/deletar/id => Deleta o filme que possui o id digitado .
	POST - /filmes/criar => Adiciona um novo filme  com os dados enviados .
	PUT - /filmes/update/id => Modifica o filme que possui o mesmo id .
	PATCH /filmes/update/id => Altera o campo enviado  do filme que possui o mesmo id digitado.
	PATCH /filmes/updateTitle =>  Altera o campo enviado  do filme que possui o mesmo titulo digitado (digite no KEY titulo)

```

- Series:
 ```bash
    GET-/series/assistir => Retorna todos os series .
	GET -/series/buscar/id => Retorna o serie do id digitado.
	GET - /series/buscar => Retorna o serie que possui o mesmo titulo digitado(digite no KEY titulo)
	GET - /series/filtrar => Retorna todos as series que possui o genero digitado (digite no KEY genero)
	DELETE- /series/deletar/id => Deleta a serie que possui o id digitado .
	POST - /series/criar => Adiciona um novo serie com os dados enviados .
	PUT - /series/update/id => Modifica o serie que possui o mesmo id .
	PATCH /series/update/id => Altera o campo enviado   da serie que possui o mesmo id digitado.
	PATCH /series/updadeTitle =>  Altera o campo enviado  da serie que possui o mesmo titulo digitado (digite no KEY titulo)

```