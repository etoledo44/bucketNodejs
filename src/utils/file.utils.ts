const fs = require('fs/promises');

async function ensureDir(path) {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path, { recursive: true });
  }
}

export { ensureDir };
