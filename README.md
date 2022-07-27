[![Node.js CI](https://github.com/rodps/clean-node-api/actions/workflows/test.yml/badge.svg)](https://github.com/rodps/clean-node-api/actions/workflows/test.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# clean-node-api

Projeto baseado no curso desenvolvido pelo professor Rodrigo Manguinho (https://www.udemy.com/course/tdd-com-mango/).

Arquitetura:

![aaa drawio (1)](https://user-images.githubusercontent.com/28078640/181339754-bf7b1921-8e16-46ae-814c-717bcd1e74fc.png)

Utilizando o princípio da inversão de depêndencia, os detalhes da aplicação como frameworks e banco de dados apontam para o domínio, 
possibilitando dessa forma que nossas regras de negócio fiquem menos acoplado a bibliotecas externas.
Além disso, o uso de componentes separados nos permite que sejam testados individualmente, sem que a mudança na implementação de um componente cause quebras em outro.

A arquitetura da aplicação está dividida em três componentes principais:
- Presentation:
Contém os controllers e middlewares, responsáveis por receber e responder solicitações HTTP, bem como validar requisições mal formadas.
- Domain:
Contém as regras de negócio da nossa aplicação, divididas em seus respectivos Use Cases que serão utilizados pelos Controllers.
- Repository:
Responsável pelo acesso ao banco de dados.

Ferramentas utilizadas:
- Node.js
- Typescript
- Express.js
- Prisma
- Jest
- jest-mock-extended
- Supertest
- Docker
- Postgresql
- Swagger
- Husky
- Eslint
- lint-staged
- Conventional commits
- Github Actions
- Heroku

Como executar:
- Instalar as dependencias:
  ```console
  npm install
- Iniciar o banco de dados via docker compose (necessário ter o Docker instalado):
  ```console
  npm run db:up
  ```
- Executar as migrações no banco de dados:
  ```console
  npm run migrate
  ```
- Executar o servidor em modo desenvolvimento:
  ```console
  npm run dev
  ```

Endpoints:
- POST /signup  - Criar conta
- POST /signin  - Login
- POST /books   - Adicionar livro
- POST /:userId/borrows  - Emprestar livro (in progress...)

A especificação completa da API pode ser encontrada em:
https://clean-books-api.herokuapp.com/docs/
