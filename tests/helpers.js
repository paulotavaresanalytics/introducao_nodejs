const { spawn } = require('node:child_process');
const { once } = require('node:events');
const net = require('node:net');
const path = require('node:path');
const assert = require('node:assert/strict');

// Cada teste inicia seu próprio servidor em uma porta livre e o encerra ao terminar.
exports.startServer = async function (t, project, env = {}) {
  const socket = net.createServer();
  socket.listen(0, '127.0.0.1');
  await once(socket, 'listening');
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const child = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..', project),
    env: { ...process.env, ...env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let log = '';
  child.stdout.on('data', data => { log = (log + data).slice(-6000); });
  child.stderr.on('data', data => { log = (log + data).slice(-6000); });
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null) {
      const stopped = once(child, 'exit');
      child.kill();
      await stopped;
    }
  });
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 150; attempt++) {
    assert.equal(child.exitCode, null, `${project} encerrou: ${log}`);
    try {
      const response = await fetch(base + (project.startsWith('node-b') || project === 'node-mogoose' ? '/usuarios' : project === 'servidor-http' ? '/api/produtos' : '/'), { signal: AbortSignal.timeout(1000) });
      await response.text();
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, `${project} não ficou pronto. Verifique os bancos e variáveis.\n${log}`);
  return async (route, method = 'GET', body) => {
    const response = await fetch(base + route, {
      method, signal: AbortSignal.timeout(5000),
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await response.text();
    const data = response.headers.get('content-type')?.includes('application/json') ? JSON.parse(text) : text;
    return { status: response.status, data };
  };
};
