import { createReadStream, createWriteStream } from 'fs';
import { getArgsArr, buildPath, getFullPath, handleErrors } from './util.js';

export const cp = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArgsArr(argsStr, 2);
    const fromPath = await getFullPath(arg1, 'file');
    const toPath = buildPath(arg2);
    
    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('File copied successfully.');
        res();
      });
      stream.on('error', (err) => {
        rej(err);
      });
    });

  } catch(err) {
    handleErrors(err);
  }
};
