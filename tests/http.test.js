const test = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('./helpers');

test('servidor simples: mensagem de boas-vindas', async t => {
  const request = await startServer(t, 'servidor-simples');
  assert.deepEqual(await request('/'), { status: 200, data: 'Bem-vindo ao nosso Servidor Node.js!' });
});

test('Express: rotas públicas e rota inexistente', async t => {
  const request = await startServer(t, 'node-express');
  assert.deepEqual(await request('/'), { status: 200, data: { message: 'Página inicial' } });
  assert.deepEqual(await request('/sobre'), { status: 200, data: { message: 'Página sobre' } });
  assert.equal((await request('/inexistente')).status, 404);
});

test('produtos: CRUD, corpo vazio e IDs inexistentes', async t => {
  const request = await startServer(t, 'servidor-http');
  const initial = await request('/api/produtos');
  assert.equal(initial.status, 200);
  assert.deepEqual(initial.data, [{ id: 1, nome: 'Produto A', preco: 50 }, { id: 2, nome: 'Produto B', preco: 30 }]);
  const created = await request('/api/produtos', 'POST', { nome: 'Teste', preco: 42 });
  assert.equal(created.status, 201);
  const id = created.data.produto.id;
  assert.equal(typeof id, 'number');
  const updated = await request(`/api/produtos/${id}`, 'PUT', { nome: 'Alterado', preco: 43 });
  assert.equal(updated.status, 200);
  assert.deepEqual(updated.data.produto, { id, nome: 'Alterado', preco: 43 });
  assert.deepEqual((await request('/api/produtos')).data.find(p => p.id === id), updated.data.produto);
  assert.equal((await request(`/api/produtos/${id}`, 'DELETE')).status, 200);
  assert.deepEqual((await request('/api/produtos')).data, initial.data);
  assert.equal((await request(`/api/produtos/${id}`, 'PUT', {})).status, 404);
  assert.equal((await request(`/api/produtos/${id}`, 'DELETE')).status, 404);
  assert.equal((await request('/api/produtos', 'POST')).status, 400);
  assert.equal((await request('/inexistente')).status, 404);
});
