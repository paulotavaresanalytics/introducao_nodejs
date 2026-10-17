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

## Executar e verificar rapidamente

Requer **Node.js 24 LTS** (versão declarada em `.nvmrc`). Cada pasta é uma aplicação independente. Não há etapa de build. A API de produtos é o ponto de entrada recomendado para conhecer o projeto.

### GitHub Codespaces

1. Abra **Code → Codespaces → Create codespace on main** após esta configuração estar na branch.
2. A configuração `.devcontainer` prepara Node.js, instala as dependências e inicia MySQL e MongoDB com verificações de disponibilidade. Aguarde a criação terminar.
3. No terminal da raiz, execute:

   ```bash
   npm run test:all
   cd servidor-http
   npm start
   ```

4. Na aba **Ports**, abra a porta `3000` e acrescente `/api/produtos` ao endereço fornecido pelo Codespaces.

O contêiner de desenvolvimento acessa os bancos pelos nomes `mysql` e `mongo`; essas variáveis já estão configuradas no `.devcontainer`.

### VS Code local

Instale Git e Node.js 24. Para testar os bancos, instale também Docker com Compose v2 e mantenha o Docker em execução (Docker Desktop no Windows/macOS). No Windows, WSL2 ou **Dev Containers: Reopen in Container** fornece o mesmo ambiente Linux usado pelo Codespaces.

```bash
git clone https://github.com/paulotavaresanalytics/introducao_nodejs.git
cd introducao_nodejs
npm run setup
npm test
```

`npm run setup` instala as dependências com `npm ci`, respeitando os lockfiles. Para testar os cinco exemplos com bancos reais:

```bash
npm run db:up
npm run test:all
```

O Compose cria o schema MySQL e aguarda os dois bancos ficarem disponíveis. Os testes de integração usam registros próprios e os removem ao terminar; use bancos de desenvolvimento. Sem bancos em execução, `npm run test:integration` falha, em vez de ignorar os testes.

Para iniciar a API de produtos:

```bash
cd servidor-http
npm start
```

Abra `http://localhost:3000/api/produtos`. Para parar, use `Ctrl+C`.

### O que os testes demonstram

| Comando na raiz | Escopo |
|---|---|
| `npm test` | Boas-vindas, rotas Express, CRUD de produtos, entrada JSON ausente e respostas 404 |
| `npm run test:integration` | CRUD persistido em MySQL e MongoDB, IDs inexistentes e validação de criação no MongoDB |
| `npm run test:all` | As duas suítes acima |

A automação em `.github/workflows/tests.yml` instala dependências, inicia bancos reais e executa ambas as suítes em cada push e pull request. Um resultado local não comprova uma execução no GitHub: consulte a aba **Actions** para ver o resultado de cada commit.

### Limitações e dados de desenvolvimento

- Os exemplos usam a porta `3000` por padrão: execute um por vez ou defina a variável `PORT` para usar portas diferentes. Os testes escolhem portas livres automaticamente.
- A API de produtos mantém dados em memória; reiniciar restaura os produtos iniciais.
- As APIs são exercícios didáticos, sem autenticação. As credenciais do Compose são públicas e exclusivas para desenvolvimento; os bancos são publicados apenas na interface local.
- `npm run db:down` para os bancos e preserva os volumes. `docker compose down -v` **apaga os dados** dos volumes deste projeto; use apenas para recriar bancos descartáveis.
- Se as portas `3306` ou `27017` estiverem ocupadas, pare os serviços locais conflitantes antes de usar o Compose.

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

Os três primeiros projetos da tabela rodam sem banco de dados. Os dois últimos precisam dos respectivos bancos; eles são opcionais para estudar os exemplos básicos.

### Preparando o `node-banco` (MySQL)

Na raiz, rode `npm run db:up`. Para iniciar a API manualmente no VS Code local, copie `node-banco/.env.example` para `node-banco/.env` e use `DB_PASSWORD=local_dev_only`, correspondente ao Compose. Depois execute `npm start` dentro de `node-banco`. O arquivo `.env` é ignorado pelo Git. No Codespaces, as variáveis já são fornecidas pelo contêiner.

Para MySQL instalado sem Docker, execute `bancos_de_dados/cadastro_usuarios.sql` como administrador, escolhendo sua senha, e preencha o `.env` com os mesmos dados. As variáveis disponíveis são `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`.

### Preparando o `node-mogoose` (MongoDB)

O mesmo `npm run db:up` inicia o MongoDB. Execute `npm start` dentro de `node-mogoose`. O endereço padrão é `mongodb://127.0.0.1:27017/exemplo_nosql`. Para outro servidor, defina `MONGODB_URI` no ambiente do processo; não é necessário alterar o código. No Codespaces, essa variável já aponta para o serviço `mongo`.

---

## Tecnologias

Node.js · JavaScript · Express 5 · API REST · MySQL (`mysql2`) · MongoDB (Mongoose) · Morgan · dotenv

---

## Autor

**Paulo Tavares** · [GitHub](https://github.com/paulotavaresanalytics)

Projeto sob a licença [MIT](LICENSE).
