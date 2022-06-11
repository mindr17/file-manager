import path from 'path';
import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { fileManager } from './FileManager.js';

export const compress = async (argsStr) => {
  try {
    const argsArr = argsStr.split(' ');
    if (argsArr.length !== 2) {
      console.error(`Invalid input! Expecting 2 arguments.`);
      return;
    }
    const firstArg = argsArr[0];
    const secondArg = argsArr[1];
    const currentDir = fileManager.currentDir;

    // TODO: add handling absolute paths
    const fromPath = path.join(currentDir, firstArg);
    const toPath = path.join(currentDir, secondArg);
  
    const readStream = fs.createReadStream(fromPath, 'utf8');
    const gzip = createGzip();
    const writeStream = fs.createWriteStream(toPath, { encoding: "utf8" });
  
    pipeline(
      readStream,
      gzip,
      writeStream,
      err => {
        if (err) {
          console.error(err);
        }
      }
    );
  } catch(err) {
    console.error(`Operation failed!\n${err}`);
  }
};
