import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Execute este instalador com npm run setup na raiz.');

for (const project of ['servidor-http', 'node-express', 'node-banco', 'node-mogoose']) {
  // Executar o CLI pelo Node evita diferenças entre npm e npm.cmd no Windows.
  const result = spawnSync(process.execPath, [npmCli, 'ci', '--cache', `${root}/.npm`, '--no-fund', '--no-audit'], {
    cwd: `${root}/${project}`, stdio: 'inherit'
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
