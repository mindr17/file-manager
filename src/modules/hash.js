import { createReadStream, promises as fsPromises } from 'fs';
import path from 'path';
import { stdout } from 'process';
import { getArgsArr } from './util.js';
import { createHash } from 'crypto';

export const hash = async (argsStr) => {
  try {
    const argsAreCorrect = checkArgsCount(argsStr, 1);
    console.log('argsAreCorrect: ', argsAreCorrect);
    const currentDir = fileManager.currentDir;
    const filePath = path.join(currentDir, argsStr);

    const stats = await fsPromises.stat(filePath);
    if (!stats.isFile()) {
      console.error(`Invalid input!\ncat: no such file: ${inputStr}`);
      return;
    }

    if (!checkIfFileExists(filePath)) {
      console.error('Invalid input! No such file.');
      return;
    }

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

    
    const contents = await new Promise((resolve, reject) => {
      stream.on('end', () => resolve(stream.read()));
    });
    
    const hash = createHash('sha256');
    const myHash = hash.update(contents);
    const hex = myHash.digest('hex');
    stdout.write(`${hex}\n`);

  } catch(err) {
    console.error(`Operation failed!\n${err}`);
  }
};
