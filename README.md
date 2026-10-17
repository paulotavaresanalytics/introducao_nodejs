# Node.js para Dados e Back-end: projetos práticos

Repositório com os exercícios que desenvolvi no curso **Node.js: Introdução ao Desenvolvimento de APIs Modernas**. Ele mostra, passo a passo, como um sistema recebe pedidos, consulta informações em um banco de dados e devolve respostas, do jeito que aplicações reais fazem.

---

## O que é Node.js?

Node.js é uma ferramenta que permite usar a linguagem **JavaScript** fora do navegador, para construir o "lado de trás" de sistemas: o servidor que guarda, organiza e entrega as informações.

Uma analogia: se um site ou aplicativo fosse um restaurante, a tela seria o salão, onde o cliente faz o pedido, e o Node.js seria a cozinha, que recebe o pedido, busca os ingredientes (os dados) e entrega o prato pronto.

---

## Para que o Node.js é usado na área de dados

O Node.js é muito usado em empresas que lidam com informação em tempo real. Alguns exemplos:

- **APIs de dados:** um serviço que entrega dados de vendas, estoque ou clientes para painéis (dashboards), sites e aplicativos, sempre no formato que eles entendem.
- **Painéis em tempo real:** indicadores que se atualizam sozinhos, como vendas do dia ou acessos a um site, sem precisar recarregar a página.
- **Pipelines de dados:** programas que coletam informações de várias fontes, transformam e gravam em um banco de dados. Esse trabalho de "pegar, organizar e guardar" é conhecido como ETL.
- **Coleta automática (web scraping e integrações):** robôs que buscam preços, notícias ou dados de outros sistemas por meio de suas APIs.
- **Integração entre sistemas:** conectar uma loja virtual, um sistema de pagamento e uma planilha, para que os dados circulem sem digitação manual.
- **Disponibilizar modelos de inteligência artificial:** um modelo de previsão treinado em Python, por exemplo, pode ser exposto como uma API para que outros sistemas façam perguntas a ele.

Em resumo: quando uma empresa precisa que seus dados **cheguem a quem precisa, no momento certo**, o Node.js costuma fazer parte dessa engrenagem.

---

## O que você encontra neste repositório

Cada pasta é um projeto pequeno que mostra uma etapa desse caminho:

| Pasta | O que ela demonstra | Em linguagem simples |
|---|---|---|
| `servidor-simples/` | Um servidor que responde a pedidos | O primeiro "atendente" digital, que recebe um pedido e responde |
| `servidor-http/` | Uma API REST de produtos | Um catálogo que permite listar, criar, alterar e remover itens pela internet |
| `node-express/` | Um servidor com rotas organizadas e registro de acessos | Um sistema que sabe o caminho de cada pedido e anota quem acessou o quê |
| `node-banco/` | Uma API de usuários conectada ao MySQL | Um cadastro guardado em um banco de dados relacional (tabelas, parecidas com planilhas) |
| `node-mogoose/` | Uma API de usuários conectada ao MongoDB | O mesmo cadastro, mas guardado em um banco de dados de documentos, mais flexível |
| `bancos_de_dados/` | Scripts para criar o banco e a tabela | A "estrutura" que recebe os dados |
| `mongo_db/` | Roteiro para criar a coleção no MongoDB | O mesmo papel do script anterior, para o MongoDB |
| `aula01/` | Anotações de exercícios de JavaScript | Os primeiros passos da linguagem |

**Conceitos aplicados:** API REST (comunicação entre sistemas por meio de pedidos padronizados), operações de **CRUD** (criar, ler, atualizar e excluir dados), separação entre rotas e lógica de negócio, validação de dados, respostas com códigos de status (como 200 para sucesso e 404 para "não encontrado"), e consultas protegidas contra SQL injection.

---

## Como executar o projeto

Você não precisa instalar nada no seu computador para começar. A **Parte 1** usa o GitHub Codespaces, que roda o projeto na nuvem, direto no navegador. A **Parte 2** é para quem prefere trabalhar no seu próprio computador com o VS Code.

### Parte 1: GitHub Codespaces (no navegador)

1. Na página deste repositório, clique no botão verde **Code**.
2. Abra a aba **Codespaces** e clique em **Create codespace on main**.
3. Aguarde alguns instantes. O VS Code abrirá no navegador com o projeto pronto.
4. Abra o terminal (menu **Terminal → New Terminal**) e digite os comandos abaixo, um por vez, apertando Enter após cada um:

   ```bash
   cd servidor-http
   npm install
   npm start
   ```

   - `cd servidor-http` entra na pasta do projeto.
   - `npm install` baixa as ferramentas que o projeto precisa. Leva alguns segundos.
   - `npm start` liga o servidor.

5. Quando aparecer a notificação de porta, clique em **Open in Browser**. Se ela não aparecer, abra a aba **Ports** e clique no link da porta `3000`.
6. No fim do endereço do navegador, acrescente `/api/produtos` e pressione Enter. Você verá a lista de produtos em formato JSON, que é o formato que sistemas usam para trocar dados.

Para parar o servidor, clique no terminal e pressione `Ctrl+C`.

### Parte 2: VS Code no seu computador

**O que você precisa instalar antes:**

- [Git](https://git-scm.com/): ferramenta que baixa projetos do GitHub.
- [Node.js](https://nodejs.org/) na versão LTS recente (os projetos foram testados com a versão 22).
- [VS Code](https://code.visualstudio.com/): o editor de código.

**Passo a passo:**

1. Abra o terminal do seu computador (no Windows, use o *Prompt de Comando* ou o *PowerShell*; no macOS e Linux, use o *Terminal*) e clone o repositório. Clonar significa copiar o projeto do GitHub para o seu computador:

   ```bash
   git clone https://github.com/paulotavaresanalytics/introducao_nodejs.git
   ```

2. Entre na pasta que foi criada e abra o projeto no VS Code:

   ```bash
   cd introducao_nodejs
   code .
   ```

   Se o comando `code .` não funcionar, abra o VS Code manualmente e escolha **File → Open Folder**, depois selecione a pasta `introducao_nodejs`.

   Também é possível clonar pelo próprio VS Code: pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no macOS), digite **Git: Clone**, cole o endereço do repositório e escolha onde salvá-lo.

3. No VS Code, abra o terminal integrado (atalho `Ctrl+'`) e rode, dentro da pasta do projeto:

   ```bash
   cd servidor-http
   npm install
   npm start
   ```

4. Acesse [http://localhost:3000/api/produtos](http://localhost:3000/api/produtos) no navegador. Você verá a mesma lista de produtos da Parte 1.

Para parar o servidor, volte ao terminal e pressione `Ctrl+C`.

---

## Testando as rotas sem programar

Os projetos de API têm arquivos `request/testes.rest` com os pedidos já escritos. Para usá-los:

1. Instale a extensão **REST Client** no VS Code (ícone de extensões, na barra lateral).
2. Abra um arquivo `testes.rest`, por exemplo `servidor-http/request/testes.rest`.
3. Clique em **Send Request** acima de cada pedido e veja a resposta ao lado.

---

## Executando os demais projetos

| Projeto | Como rodar | O que precisa além do Node.js |
|---|---|---|
| `servidor-simples/` | `npm start` | Nada |
| `servidor-http/` | `npm install` e `npm start` | Nada |
| `node-express/` | `npm install` e `npm start` | Nada |
| `node-banco/` | `npm install` e `npm start` | Um servidor MySQL (veja abaixo) |
| `node-mogoose/` | `npm install` e `npm start` | Um servidor MongoDB rodando em `localhost:27017` |

Os quatro primeiros projetos rodam sozinhos. Os dois últimos precisam de um banco de dados, e isso é opcional para entender o código.

### Preparando o banco do `node-banco` (MySQL)

1. Com o MySQL instalado, crie o banco, a tabela e o usuário executando o script `bancos_de_dados/cadastro_usuarios.sql`. Antes, troque `troque_esta_senha` por uma senha de sua escolha.
2. Na pasta `node-banco/`, copie o arquivo `.env.example` e renomeie a cópia para `.env`. Nele, coloque a mesma senha usada no script.
3. Rode `npm start` na pasta `node-banco/`.

Se o `.env` não existir, o projeto usa os valores padrão do código. Ainda assim, o banco precisa estar criado com a senha correspondente.

### Preparando o `node-mogoose` (MongoDB)

A conexão aponta para `mongodb://localhost:27017/exemplo_nosql`. Se você tiver o MongoDB rodando localmente, basta executar `npm start`. Para usar outro servidor, como o MongoDB Atlas, altere a string de conexão em `node-mogoose/config/db.js`.

---

## Tecnologias

Node.js · JavaScript · Express 5 · API REST · MySQL (`mysql2`) · MongoDB (Mongoose) · Morgan · dotenv

---

## Autor

**Paulo Tavares** · [GitHub](https://github.com/paulotavaresanalytics)

Projeto sob a licença [MIT](LICENSE).
