import fs from 'fs';
import zlib from 'zlib';
import { getFullPath, getArgsArr, buildPath, handleErrors } from './util.js';

export const decompress = async (argsStr) => {
  try {
    const [ firstArg, secondArg ] = getArgsArr(argsStr, 2);

    const fromPath = await getFullPath(firstArg, 'file');
    console.log('fromPath: ', fromPath);
    const toPath = buildPath(secondArg);
    console.log('toPath: ', toPath);
  
    const readStream = fs.createReadStream(fromPath);
    const gunzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(toPath);
    
    readStream.pipe(gunzip).pipe(writeStream);

    // writeStream.on('finished', () => {
    //   console.log('finished!');
    // });

  } catch(err) {
    handleErrors(err);
  }
};
