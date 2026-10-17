# Node.js: Introdução ao Desenvolvimento de APIs Modernas

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/status-concluído-brightgreen)

Coleção de projetos práticos em **Node.js** desenvolvidos durante o curso *Node.js: Introdução ao Desenvolvimento de APIs Modernas*. O repositório vai do servidor HTTP nativo até APIs REST conectadas a bancos de dados **MySQL** e **MongoDB**.

---

## Tecnologias

Node.js · JavaScript · Express 5 · REST · MySQL (`mysql2`) · MongoDB (Mongoose) · Morgan · dotenv

## Destaques

- **API REST com arquitetura em camadas:** rotas separadas da lógica de negócio (`routes.js` e `controllers/`), com respostas em JSON e códigos de status HTTP adequados (200, 201, 400, 404, 500).
- **Persistência em MySQL com consultas parametrizadas:** os valores são enviados como parâmetros (`?`), evitando SQL injection.
- **Modelagem com Mongoose:** schemas com validações de campo (obrigatório, valor mínimo, unicidade e formato de e-mail).
- **Configuração sensível fora do código:** a senha do banco é lida de variável de ambiente com `dotenv`.
- **Projetos independentes:** cada pasta tem seu próprio `package.json` e pode ser executada isoladamente.

---

## Estrutura do repositório

| Pasta | O que tem |
|---|---|
| `servidor-simples/` | Servidor HTTP com o módulo nativo `http`, sem frameworks |
| `servidor-http/` | **API REST de produtos** com rotas, controller e requisições de teste |
| `node-express/` | Servidor com Express.js, rotas e log de requisições com Morgan |
| `node-banco/` | API de usuários com CRUD conectada ao MySQL |
| `node-mogoose/` | API de usuários com CRUD conectada ao MongoDB via Mongoose |
| `bancos_de_dados/` | Scripts SQL de criação do banco e da tabela de exemplo |
| `mongo_db/` | Playground do MongoDB para criar a coleção de exemplo |
| `aula01/` | Anotações de exercícios de JavaScript (não é um projeto executável) |

---

## Como executar

Cada projeto é independente. **Recomendo começar pelo `servidor-http/`**, que não exige nenhum banco de dados.

### Opção 1: GitHub Codespaces (sem instalar nada)

O Codespaces roda o projeto em um ambiente pronto, direto no navegador.

1. Na página do repositório, clique no botão verde **Code**.
2. Abra a aba **Codespaces** e clique em **Create codespace on main**.
3. Aguarde o VS Code abrir no navegador. Ele já vem com Node.js e npm instalados.
4. No terminal, execute:

   ```bash
   cd servidor-http
   npm install
   npm start
   ```

5. Quando aparecer a notificação de porta, clique em **Open in Browser**. Se não aparecer, abra a aba **Ports** e clique no link da porta `3000`.
6. Adicione `/api/produtos` ao final da URL para ver a lista de produtos.

### Opção 2: VS Code com o repositório clonado

**Pré-requisitos:** [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) (versão LTS recente; os projetos foram testados com a 22) e [VS Code](https://code.visualstudio.com/).

1. Clone o repositório pelo terminal:

   ```bash
   git clone https://github.com/paulotavaresanalytics/introducao_nodejs.git
   cd introducao_nodejs
   code .
   ```

   Também é possível clonar pelo próprio VS Code: pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no macOS), digite **Git: Clone** e cole a URL do repositório.

2. Abra o terminal integrado (`Ctrl+'`) e execute:

   ```bash
   cd servidor-http
   npm install
   npm start
   ```

3. Acesse [http://localhost:3000/api/produtos](http://localhost:3000/api/produtos) no navegador.

---

## Testando a API

Os projetos de API têm arquivos `request/testes.rest` com as requisições prontas. Para usá-los, instale a extensão **REST Client** no VS Code, abra o arquivo e clique em **Send Request** acima de cada requisição.

Também é possível testar pelo terminal:

```bash
curl http://localhost:3000/api/produtos
```

---

## Executando os demais projetos

| Projeto | Comando | Requisito extra |
|---|---|---|
| `servidor-simples/` | `node server.js` | Nenhum |
| `servidor-http/` | `npm install` e `npm start` | Nenhum |
| `node-express/` | `npm install` e `npm start` | Nenhum |
| `node-banco/` | `npm install` e `npm start` | MySQL em execução e arquivo `.env` com `DB_PASSWORD` |
| `node-mogoose/` | `npm install` e `npm start` | MongoDB em execução em `localhost:27017` |

**Sobre o `node-banco/`:** a conexão usa o banco `cadastro_usuarios` com o usuário `app_node`, configurados em `config/db.js`. Crie esse banco e esse usuário no MySQL, ou ajuste os dados no arquivo, antes de iniciar a aplicação.

**Sobre o `node-mogoose/`:** a aplicação se conecta a `mongodb://localhost:27017/exemplo_nosql`. Caso use o MongoDB Atlas ou outro servidor, altere a string de conexão em `config/db.js`.

---

## Autor

**Paulo Tavares**: [GitHub](https://github.com/paulotavaresanalytics)

Projeto sob a licença [MIT](LICENSE).
