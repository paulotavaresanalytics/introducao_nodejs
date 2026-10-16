/* global use, db */
// MongoDB Playground

// Nome do banco de dados
const database = 'exemplo_nosql';

// Nome da coleção
const collection = 'usuario';

// Selecionar o banco de dados
use(database);

// Criar a coleção
db.createCollection(collection);

// Verificar as coleções existentes
db.getCollectionNames();