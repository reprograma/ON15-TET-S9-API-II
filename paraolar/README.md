# <div align = center> ON15-TET-S9-API-III </div>

<div align = "center">
    <p>
        Turma Online Todas em Tech - Back-end | Semana 9: Introdução à API: <b>DELETE</b> + <b>PUT</b> + <b>PATCH</b>.
    </p>
</div>

<br>
<div align = "center">
<img src='./assets/reprogramaflixx.jpeg' width = 500 alt = 'logo reprogramaflix'>
</div>
<br>

# Introdução

<div align = "justify">
    <p>
         HTTP é um protocolo responsável pela comunicação de websites. Um website, ao ser acessado, recebe esse protocolo. Esse protocolo possui métodos, que também podem ser chamados de verbos. O protocolo baseado no modelo Client/Server, possui pedidos (requests) e respostas (responses) e é através desses requests e responses que a comunicação acontece. Os métodos HTTP, que definem qual ação acontecerá, são: <b>GET, POST, PUT, PATCH</b> e <b> DELETE</b>.
    </p>
</div>

<br>

# Sobre o Projeto

<div align = "center">
<h3><b style = "color:purple">{reprograma}</b><b>flix</b></h3>
</div>
<br>
<div align = "justify">
    <p>
        Durante a semana 9 do curso <a href="https://reprograma.com.br/" target="_blank"> <b style='color:purple'>{reprograma}</b></a>, foi desenvolvida uma <b> Web API</b> de <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/models/filmes.json" target="_blank"> filmes </a> e <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/models/series.json" target="_blank">séries</a>. O intuito dessa semana foi que as alunas aprendessem sobre os métodos <b>DELETE</b>, <b>PUT</b> e <b>PATCH</b> e assim serem capazes de realizar o <b>CRUD</b> - acrônimo para CREATE, READ, UPDATE e DELETE. 
    </p>
     
</div>

<br>

<div align = "center">

|          DELETE       |           PUT           |          PATCH         |
| :-------------------: | :---------------------: |:---------------------: |
|          Deletar      |          Atualizar      |         Atualizar      |
|    deleta um item     |  atualiza completamente |   atualiza em partes   |

</div>
<div align = "justify">
    <p>
        O acrônimo CRUD tem relação direta com os verbos (métodos) GET, PUT, POST, PATCH, DELETE, como é possível visualizar na tabela abaixo: 
    </p>
</div>

<div align = "center">

|          CRUD       |           VERBOS          |       
| :-------------------: | :---------------------: |
|          CREATE      |          POST      |         
|    READ     |  GET |   
|    UPDATE    |  PUT/PATCH| 
|    DELETE    |  DELETE | 

</div>

<br>

<div align = "justify">
    Para a criação de uma API RESTful simples, foi desenvolvido um <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/server.js" target="_blank"> servidor </a> simples com as seguintes rotas:
</div>

<br>

<div align = "center">

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
</div>

<br>
<div align = "justify">
    <p>
         Através dessa web API, é possível consultar uma lista de filmes e séries onde, usando o método GET, se recebe uma <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/models/mensagem.json">mensagem</a> inicial e onde, através dele, também é possível fazer busca por todos os filmes e séries, além de buscas por ID, título ou por gênero. Através do método PUT, é possível atualizar todos os itens de um filme ou série. Com o método POST é possível fazer o cadastramento de novos filmes e séries. Utilizando o método PATCH, é possível atualizar os títulos dos filmes ou séries, além de qualquer outro item que se deseje atualizar. Por fim, fazendo uso do método DELETE, é possível deletar um filme ou série.
    </p>
</div>

<br>
<div align = "justify">

# Estrutura do projeto

<br>
<div align = "justify">
    <p>
         Esse projeto foi construído utilizando a arquitetura MVC, acrônimo para Model-View-Controller ou, em português, Arquitetura Modelo-Visão-Controle. MVC é um padrão de arquitetura de software, voltado para o reuso de códigos e onde a separação dos mesmos ocorre em três camadas interconectadas. A apresentação dos dados é separada dos métodos que interagem com o banco de dados. Nesse projeto, foi utilizada uma simulação de <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/models/dbConfig.js"> banco de dados </a> e, utilizando setTimeout, a assincronicidade foi simulada.
    </p>
</div>

1. O servidor, criado dentro da pasta <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/tree/BrunaCelestino/paraolar"> **paraolar**</a>, conta com a seguinte estrutura:


    ```bash
        \--📂 paraolar
            | 
            |    server.js
            |
            |    package-lock.json
            |    package.json
            |    README.md
            |
            \--📂src
                    |
                    |   app.js
                    |
                    📂---controllers
                    |
                    |   entradaController.js
                    |   filmesController.js
                    |   seriesController.js 
                    |
                    📂---model
                    |
                    |   dbConfig.js
                    |   mensagem.json
                    |   filmes.json
                    |   series.json
                    |
                    📂---routes
                            entradaRoutes.js  			      
                            filmesRoutes.js  			          
                            seriesRoutes.js
                            
    ```

<div align = "justify">
    <ul>
        <li> 
            "<b>server.js</b>" - Define onde o servidor local irá ser executado;
        </li>
        <li> 
            "<b><a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/app.js">app.js</a></b>" - Requere as dependências necessárias para o projeto e define o padrão de cada rota;
        </li>
        <li> 
            "<b><a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/tree/BrunaCelestino/paraolar/src/controllers">controllers</a></b>" - pasta contendo os arquivos: <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/controllers/entradaController.js">entradaController.js</a>, <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/controllers/filmesController.js">filmesController.js</a> e <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/controllers/seriesController.js">seriesController.js</a>. Cada arquivo define, em fuções, o que cada rota deve realizar;
        </li>
        <li> 
            "<b><a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/tree/BrunaCelestino/paraolar/src/models">models</a></b>" - pasta contendo o aquivo dbConfig.js, que simula o banco de dados, além dos arquivos: filmes.json, series.json e mensagem.json, que contém as informações sobre filmes, séries e a mensagem inicial; 
        </li>
        <li> 
            "<b><a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/tree/BrunaCelestino/paraolar/src/routes">routes</a></b>" - pasta contendo os arquivos: <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/routes/entradaRoutes.js">entradaRoutes.js</a>, <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/routes/filmesRoutes.js">filmesRoutes.js</a> e <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/src/routes/seriesRoutes.js">seriesRoutes.js</a>. Esses arquivos acrescentam o complemento à cada rota genérica, fazendo com que elas se tornem completas e possam ser acessadas; 
        </li>
        <li> 
            <b>Outros arquivos</b> - package-lock.json e package.json são arquivos relacionados a dependências e README.md, contendo a documentação do projeto.
        </li>
    </ul>
</div>

<br>

# Dependências

<div align = "justify">
    <p>
        Para que fosse possível a execução desse projeto, foi necessária a utilização de algumas dependências, descritas a seguir:
    </p>
</div>

<br>

<h2>Módulos:</h2>

<div align = "justify">
    <ul>
        <li>
            <a href = "https://www.npmjs.com/package/express" target="_blank">Express </a> - framework para aplicativo da web do Node.js;
        </li>
        <br>
        <li>
            <a href = "https://www.npmjs.com/package/nodemon" target="_blank">Nodemon </a> - ajuda no desenvolvimento de sistemas com o Node. js reiniciando automaticamente o servidor;
        </li>
        <br>
        <li>
            <a href = "https://www.npmjs.com/package/cors" target="_blank">Cors </a> - permite que um site acesse recursos de outro site mesmo estando em domínios diferentes.
        </li>
        <br>
    </ul>
</div>

<h2>Arquivos:</h2>

<div align = "justify">
    <ul>
        <li>
            <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/package-lock.json" target="_blank">package-lock.json </a> - especifica a versão e suas dependências;
        </li>
        <br>
        <li>
            <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/paraolar/package.json" target="_blank">package.json </a> - arquivo de configuração utilizado para estipular e configurar dependências;
        </li>
        <br>
        <li>
            <a href = "https://github.com/BrunaCelestino/ON15-TET-S9-API-II/blob/BrunaCelestino/.gitignore" target="_blank">.gitignore </a> - arquivo que lista quais arquivos ou pastas o Git deve ignorar.
        </li>
        <br>
    </ul>
</div>

<br>


# Instalação

1. Entre na pasta onde você deseja clonar o repositório. Abra o **git** nela e digite: 

    ```bash
    $ git clone https://github.com/BrunaCelestino/ON15-TET-S9-API-II.git
    ```

2. Digite a linha abaixo para entrar na pasta correta: 

   ```bash
    $ cd paraolar/
    ```
3. Escreva a seguinte linha para instalar as dependências utilizadas nesse projeto: 

   ```bash
    $ npm install
    ```
4. Inicie o servidor, utilizando a frase: 

   ```bash
    $ npm start
    ```   
    
    
<br>

<div align = "justify">
    <ul>
        <li> 
            Importe a coleção para teste deste servidor clicando <a href = "https://www.getpostman.com/collections/6fa3989660069293b885"> aqui</a>!
        </li>
        <li> 
            Copie o link acima e, no Postman, clique em <b>Import</b> -> <b> Link</b> (cole o link) -> <b>Continue</b> -> <b>Import</b>.
        </li>
    </ul>
</div>

<br>


# Referências

<div align = "center">

|                          Título                           |                                                              Link                                                               |
| :-------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|                     API - GET & POST                      |https://github.com/reprograma/ON15-TET-S8-API-I/blob/main/material/API%20GET.pdf                         |
| HTTP: GET e POST - Conheça as diferenças entre os métodos |https://www.alura.com.br/artigos/diferencas-entre-get-e-post                                   |
|        Diferença entre o método GET e POST em HTML        |https://pt.gadget-info.com/difference-between-get                                        |
|      Dependências de produção vs. de desenvolvimento      | https://tapmorales.gitbooks.io/workflow-front-end/content/turbinando-o-node/dependencias-de-producao-vs-de-desenvolvimento.html |
|                       Package.json                        |https://tapmorales.gitbooks.io/workflow-front-end/content/turbinando-o-node/package-json.html                  |
|                          CRUD                        |https://developer.mozilla.org/pt-BR/docs/Glossary/CRUD          |
|                          MVC                       |https://pt.wikipedia.org/wiki/MVC#:~:text=MVC%20%C3%A9%20o%20acr%C3%B4nimo%20de,a%20apresenta%C3%A7%C3%A3o%20dos%20dados%20e         |
|                Métodos de requisição HTTP                 |https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods                                    |
|                          express                          |https://www.npmjs.com/package/express                                              |
|                           cors                            |https://www.npmjs.com/package/cors                                                |
|                          nodemon                          |https://www.npmjs.com/package/nodemon           |


</div>
















