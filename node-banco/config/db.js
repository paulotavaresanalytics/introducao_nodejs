require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "app_node",
    password: process.env.DB_PASSWORD,
    database: "cadastro_usuarios",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }

    console.log("Conectado ao MySQL com sucesso!");
});

module.exports = connection;