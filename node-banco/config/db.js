require("dotenv").config();

const mysql = require("mysql2");

// Valores padrão batem com bancos_de_dados/cadastro_usuarios.sql.
// Para mudar, crie um arquivo .env na pasta node-banco (veja o .env.example).
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "app_node",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cadastro_usuarios",
    port: Number(process.env.DB_PORT) || 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        console.error("Verifique se o MySQL está rodando e se o .env está correto.");
        return;
    }

    console.log("Conectado ao MySQL com sucesso!");
});

module.exports = connection;
