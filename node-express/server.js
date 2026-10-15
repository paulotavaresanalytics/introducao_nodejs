const express = require("express");
const morgan = require("morgan"); // Importa o Morgan para log de requisições
const app = express();
const PORT = 3000;
// Configura o Morgan como middleware global para log de requisições
app.use(morgan("dev"));
// Rota para a página inicial
app.get("/", (req, res) => {
      res.json({ message: "Página inicial" }); // Resposta em JSON
});
// Rota para a página "sobre"
app.get("/sobre", (req, res) => {
      res.json({ message: "Página sobre" }); // Resposta em JSON
});
// Inicia o servidor
app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});
    