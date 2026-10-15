# Node.js: estudos e práticas de back-end

Repositório com os exercícios que desenvolvi durante o curso **Node.js: Introdução ao Desenvolvimento de APIs Modernas**. Cada pasta corresponde a um módulo ou a um exemplo prático, para que seja fácil navegar pelo meu progresso.

## O que pratiquei

- Fundamentos de JavaScript para executar no Node.js
- Criação de servidores HTTP sem frameworks
- Construção de uma API REST com rotas de listar, criar, atualizar e excluir
- Servidor com Express.js, incluindo log de requisições com middleware
- Conexão com banco de dados relacional MySQL

## Estrutura do repositório

| Pasta | Conteúdo | Módulo do curso |
|---|---|---|
| `aula01/` | Exercícios de JavaScript: funções, variáveis e template strings | 1. Introdução ao Node.js |
| `servidor-simples/` | Servidor HTTP com o módulo nativo `http` | 2. Fundamentos de APIs RESTful |
| `servidor-http/` | API REST de produtos com rotas, controller e testes em `.rest` | 2. Fundamentos de APIs RESTful |
| `node-express/` | Servidor Express com rotas e o middleware Morgan | 3. Desenvolvimento de APIs com Express.js |
| `node-banco/` | Teste de conexão com MySQL usando `mysql2` e `dotenv` | 4. Manipulação de Dados e Bancos de Dados |
| `bancos_de_dados/` | Script SQL para criar o banco e a tabela de exemplo | 4. Manipulação de Dados e Bancos de Dados |

## Destaques técnicos

- **API REST em `servidor-http/`:** separação entre rotas (`routes.js`) e lógica de negócio (`controllers/`), com respostas em JSON e códigos de status HTTP (200, 201, 400, 404).
- **Credenciais fora do código:** a conexão com o MySQL lê as variáveis de ambiente com `dotenv`, sem senhas no repositório.
- **Organização por pastas independentes:** cada exemplo tem seu próprio `package.json`, então pode ser executado de forma isolada.

## Como executar

Cada pasta é um projeto separado. Para rodar um deles:

```bash
cd servidor-http
npm install
npm start
```

Para o `node-banco`, crie um arquivo `.env` na pasta com as variáveis `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `DB_PORT`, e tenha um servidor MySQL em execução. O script `bancos_de_dados/criar_banco.sql` cria o banco e a tabela usados nos testes.

## Testando a API

Dentro de `servidor-http/request/testes.rest` e `node-express/request/testes.rest` há requisições prontas para a extensão REST Client do VS Code ou para outros clientes HTTP.
