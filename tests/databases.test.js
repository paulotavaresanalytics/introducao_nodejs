const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { startServer } = require('./helpers');

// Bancos reais obrigatórios: não há mocks nem skips silenciosos.
// Somente os registros criados pelo próprio teste são removidos.
test('MySQL: criar, consultar, atualizar e excluir usuário persistido', async t => {
  const request = await startServer(t, 'node-banco', {
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USER: process.env.DB_USER || 'app_node',
    DB_PASSWORD: process.env.DB_PASSWORD || 'local_dev_only',
    DB_NAME: process.env.DB_NAME || 'cadastro_usuarios'
  });
  const nome = `teste-${randomUUID()}`;
  let id;
  try {
    assert.equal((await request('/usuarios', 'POST', { nome, idade: 25 })).status, 201);
    const rows = await request('/usuarios');
    assert.equal(rows.status, 200);
    const user = rows.data.find(u => u.nome === nome);
    assert.ok(user);
    id = user.id;
    assert.equal(user.idade, 25);
    assert.equal((await request(`/usuarios/${id}`, 'PUT', { nome, idade: 26 })).status, 200);
    assert.equal((await request('/usuarios')).data.find(u => u.id === id).idade, 26);
    assert.equal((await request(`/usuarios/${id}`, 'DELETE')).status, 200);
    assert.ok(!(await request('/usuarios')).data.some(u => u.id === id));
    assert.equal((await request(`/usuarios/${id}`, 'DELETE')).status, 404);
    assert.equal((await request(`/usuarios/${id}`, 'PUT', { nome, idade: 26 })).status, 404);
  } finally {
    if (id) await request(`/usuarios/${id}`, 'DELETE');
  }
});

test('MongoDB: CRUD persistido e validação de usuário', async t => {
  const request = await startServer(t, 'node-mogoose', {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exemplo_nosql'
  });
  let id;
  try {
    const created = await request('/usuarios', 'POST', { nome: 'Teste', idade: 25, email: `${randomUUID()}@example.com` });
    assert.equal(created.status, 201);
    id = created.data._id;
    assert.ok(id);
    assert.ok((await request('/usuarios')).data.some(u => u._id === id));
    const updated = await request(`/usuarios/${id}`, 'PUT', { nome: 'Alterado', idade: 26 });
    assert.equal(updated.status, 200);
    assert.equal(updated.data.nome, 'Alterado');
    assert.equal((await request('/usuarios')).data.find(u => u._id === id).idade, 26);
    assert.equal((await request('/usuarios', 'POST', { nome: 'Incompleto' })).status, 400);
    assert.equal((await request(`/usuarios/${id}`, 'DELETE')).status, 200);
    assert.ok(!(await request('/usuarios')).data.some(u => u._id === id));
    assert.equal((await request(`/usuarios/${id}`, 'DELETE')).status, 404);
    assert.equal((await request(`/usuarios/${id}`, 'PUT', { nome: 'Ausente' })).status, 404);
  } finally {
    if (id) await request(`/usuarios/${id}`, 'DELETE');
  }
});
