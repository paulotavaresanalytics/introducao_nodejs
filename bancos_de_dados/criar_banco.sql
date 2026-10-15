
-- Criação do banco de dados
CREATE DATABASE exemplo_db;

-- Selecionar o banco de dados
USE exemplo_db;

-- Criação da tabela usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
