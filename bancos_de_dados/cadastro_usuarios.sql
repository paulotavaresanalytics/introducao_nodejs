-- Cria o banco, a tabela e o usuário usados pelo projeto node-banco.
-- Execute como administrador do MySQL (ex.: mysql -u root -p < cadastro_usuarios.sql).
-- Troque 'troque_esta_senha' pela mesma senha colocada no arquivo .env.

CREATE DATABASE IF NOT EXISTS cadastro_usuarios;

USE cadastro_usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE USER IF NOT EXISTS 'app_node'@'localhost' IDENTIFIED BY 'troque_esta_senha';
CREATE USER IF NOT EXISTS 'app_node'@'%' IDENTIFIED BY 'troque_esta_senha';

GRANT SELECT, INSERT, UPDATE, DELETE ON cadastro_usuarios.* TO 'app_node'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON cadastro_usuarios.* TO 'app_node'@'%';

FLUSH PRIVILEGES;
