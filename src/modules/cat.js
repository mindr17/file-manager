import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, getFullPath, handleErrors } from './util.js';

export const cat = async (inputStr) => {
  try {
    const [ firstArg ] = getArgsArr(inputStr, 1);
    const filePath = await getFullPath(firstArg, 'file');

    const readStream = createReadStream(filePath, 'utf8');

    for await (const data of readStream) {
      console.log(data);
    }

  } catch(err) {
    handleErrors(err);
  }
};
