import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, getFullPath, handleErrors } from './util.js';

export const cat = async (inputStr) => {
  try {
    const [ arg1 ] = getArgsArr(inputStr, 1);
    const filePath = await getFullPath(arg1, 'file');

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
    handleErrors(err);
  }
};
