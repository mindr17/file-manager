import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'process';
import { checkIfFileExists } from 'util';
import { fileManager } from './FileManager.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const cat = async (inputStr) => {
  const currentPath = fileManager.currentDir;
  const filePath = path.join(currentPath, inputStr);
  if (!checkIfFileExists(filePath)) throw new Error('Invalid input');
  await fsPromises.stat(filePath, (error, stats) => {
    if (error || stats.isDirectory()) {
      throw new Error('Invalid input');
    }
  });

  const stream = fs.createReadStream(filePath, 'utf8');
  stream.on('readable', async () => {
    let buffer = await stream.read();
    if (buffer) {
      const text = buffer.toString();
      stdout.write(`${text}\n`);
    }
  });
};
