
// Carrega as variáveis do arquivo .env
require("dotenv").config();

// Importa a biblioteca mysql2
const mysql = require("mysql2");

// Cria a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

// Conecta ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        connection.destroy();
        return;
    }

    console.log("Conectado ao banco de dados MySQL com sucesso!");

    // Fecha a conexão após o teste
    connection.end((endErr) => {
        if (endErr) {
            console.error("Erro ao encerrar a conexão:", endErr);
        } else {
            console.log("Conexão encerrada com sucesso.");
        }
    });
});
