import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, getFullPath, handleErrors } from './util.js';
import { createHash } from 'crypto';

export const hash = async (argsStr) => {
  try {
    const [ firstArg ] = getArgsArr(argsStr, 1);
    const filePath = await getFullPath(firstArg, 'file');

    const stream = createReadStream(filePath, 'utf8');
    const hash = createHash('sha256');
    
    const hex = await new Promise((resolve, reject) => {
      stream.on('data', chunk => hash.update(chunk));
      stream.on('end', () => {
        stream.destroy();
        const hex = hash.digest('hex');
        resolve(hex);
      });
      stream.on('error', err => reject(err));
    });
    
    stdout.write(`${hex}\n`);

  } catch(err) {
    handleErrors(err);
  }
};
