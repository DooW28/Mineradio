const { fork } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let child = null;

function start() {
  child = fork(serverPath, [], {
    stdio: 'inherit',
    env: Object.assign({}, process.env),
  });
  child.on('exit', (code, signal) => {
    console.log(`[Daemon] Server exited (code=${code}, signal=${signal}). Restarting in 2s...`);
    setTimeout(start, 2000);
  });
  child.on('error', (err) => {
    console.error('[Daemon] Failed to start server:', err.message);
    setTimeout(start, 5000);
  });
}

process.on('SIGINT', () => {
  if (child) child.kill();
  process.exit();
});
process.on('SIGTERM', () => {
  if (child) child.kill();
  process.exit();
});

console.log('[Daemon] Mineradio server daemon started');
start();
