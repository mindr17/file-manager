import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, getFullPath, handleErrors } from './util.js';
import { createHash } from 'crypto';

export const hash = async (argsStr) => {
  try {
    const [ firstArg ] = getArgsArr(argsStr, 1);
    const filePath = await getFullPath(firstArg, 'file');

    const stream = createReadStream(filePath, 'utf8');
    const streamData = await new Promise((res, rej) => {
        stream.on('readable', () => {
        const buffer = stream.read();
        if (buffer) {
          res(buffer);
        }
      });
    });

    const text = streamData.toString();
    stdout.write(`${text}\n`);

    await new Promise((resolve, reject) => {
      stream.on('end', () => resolve(stream.read()));
    });
    
    const hash = createHash('sha256');
    const myHash = hash.update(text);
    const hex = myHash.digest('hex');
    stdout.write(`${hex}\n`);

  } catch(err) {
    handleErrors(err);
  }
};
