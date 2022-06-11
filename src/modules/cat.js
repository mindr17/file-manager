import { createReadStream, promises as fsPromises } from 'fs';
import path, { resolve } from 'path';
import { stdout } from 'process';
import { checkIfFileExists } from './util.js';
import { fileManager } from './FileManager.js';

export const cat = async (inputStr) => {
  try {
    const currentPath = fileManager.currentDir;
    const filePath = path.join(currentPath, inputStr);
    
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
  } catch(err) {
    console.log(`Operation failed!\n${err}`);
  }
};
