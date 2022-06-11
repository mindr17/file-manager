import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

export const decompress = async (argsStr) => {
  try {
    const argsArr = argsStr.split(' ');
    if (argsArr.length !== 2) {
      console.error(`Invalid input! Expecting exactly 2 arguments.`);
      return;
    }
    const firstArg = argsArr[0];
    const secondArg = argsArr[1];
    const currentDir = fileManager.currentDir;

    const fromPath = path.join(currentDir, firstArg);
    const toPath = path.join(currentDir, secondArg);
  
    const readStream = fs.createReadStream(fromPath);
    const gunzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(toPath);
    
    readStream.pipe(gunzip).pipe(writeStream);
  } catch(err) {
    console.error(`Operation failed!\n${err}`);
  }
};
