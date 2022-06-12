import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { getArgsArr, buildPath, getFullPath, handleErrors } from './util.js';

export const compress = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArgsArr(argsStr, 2);
    const fromPath = await getFullPath(arg1, 'file');
    const toPath = buildPath(arg2);

    const readStream = fs.createReadStream(fromPath, 'utf8');
    const gzip = createGzip();
    const writeStream = fs.createWriteStream(toPath, { encoding: "utf8" });
    await pipeline(
      readStream,
      gzip,
      writeStream
    );
  } catch(err) {
    handleErrors(err);
  }
};
