import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { getArgsArr, buildPath, getFullPath, handleErrors } from './util.js';

export const decompress = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArgsArr(argsStr, 2);
    const fromPath = await getFullPath(arg1, 'file');
    const toPath = buildPath(arg2);
  
    const readStream = createReadStream(fromPath);
    const brotli = createBrotliDecompress();
    const writeStream = createWriteStream(toPath);

    const stream = readStream.pipe(brotli).pipe(writeStream);

    await new Promise((res, rej) => {
      stream.on('finish', () => {
        console.log('Brolti decompression done.');
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
