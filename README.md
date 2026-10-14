# Avaliacao_missao_espacial

Nome: Gustavo Henrique Cabral da Silva 
Curso: Informatica para internet 
unidade Curricular: Desenvolvimento Web 

Uma Api que cadastra uma missao espacial , com algumas caracteristicas , nome da missao , ano e agencia . 

# tecnologias utilizadas 

Node.js
Express
jest 
Supertest 
Swagger 
Json


# como clonar repositorio 

git clone Avaliacao_missao_espacial

cd Avaliacao_missao_espacial

# como instalar depedencias 

`npm i` e o nome das depedencias 

  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "swagger-jsdoc": "^6.3.0",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "cross-env": "^10.1.0",
    "jest": "^30.5.2",
    "supertest": "^7.3.1"
  }

## como iniciar 

inicie utilizando npm start 
URL - Base http://localhost:3000
Swagger - http://localhost:3000/docs

##  

`npm run test`

os testes irao ver se nossos endepoints estão funcionando .



![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)


## Buscar uma missao pelo um id 

Get
/missoes/id
Retornar uma missao pelo id
exemplo de requisição: GET http://localhost:3000/missoes/id
exemplo de resposta :  
  {
        id: 1,
        nome: "Apollo 11",
        ano: 1969,
        agencia: "NASA"
    },
status : 200 sucesso e 404 missao não encontrada 


## Buscar todas as missões
 
Get
/missoes
Retornar todas as missões. Pode filtrar por nome, agencia ou ano
exemplo de requisição: GET http://localhost:3000/missoes
exemplo de requisição com filtro: GET http://localhost:3000/missoes?nome=Apollo
exemplo de resposta :
[
  {
    id: 1,
    nome: "Apollo 11",
    ano: 1969,
    agencia: "NASA"
  },
  {
    id: 2,
    nome: "Voyager 1",
    ano: 1977,
    agencia: "NASA"
  }
]
status : 200 sucesso
 
## Criar uma missão
 
Post
/missoes
Cria uma nova missão
exemplo de requisição: POST http://localhost:3000/missoes
exemplo de body :
{
  nome: "Apollo 11",
  ano: 1969,
  agencia: "NASA"
}
exemplo de resposta :
{
  id: 3,
  nome: "Apollo 11",
  ano: 1969,
  agencia: "NASA"
}
status : 201 criada com sucesso e 400 dados inválidos
 
## Atualizar uma missão
 
Put
/missoes/id
Atualizar uma missão pelo id
exemplo de requisição: PUT http://localhost:3000/missoes/1
exemplo de body :
{
  nome: "Apollo 12",
  ano: 1969,
  agencia: "NASA"
}
exemplo de resposta :
{
  id: 1,
  nome: "Apollo 12",
  ano: 1969,
  agencia: "NASA"
}
status : 200 sucesso e 404 missão não encontrada
 
## Deletar uma missão
 
Delete
/missoes/id
Deletar uma missão pelo id
exemplo de requisição: DELETE http://localhost:3000/missoes/1
exemplo de resposta :
{
  mensagem: "Missão deletada com sucesso"
}
status : 200 sucesso e 404 missão não encontrada
 












