import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, getFullPath, handleErrors } from './util.js';

export const cat = async (inputStr) => {
  try {
    const [ firstArg ] = getArgsArr(inputStr, 1);
    const filePath = await getFullPath(firstArg, 'file');

    const stream = createReadStream(filePath, 'utf8');
    stream.on('data', data => stdout.write(data));

    await new Promise((resolve, reject) => {
      stream.on('end', () => {
        stream.destroy();
        resolve();
      });
      stream.on('error', err => reject(err));
    });
    
  } catch(err) {
    handleErrors(err);
  }
};
