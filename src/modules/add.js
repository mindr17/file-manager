import { createWriteStream } from 'fs';
import { stdout } from 'process';
import { getArgsArr, buildPath, handleErrors } from './util.js';

export const add = async (inputStr) => {
  try {
    const [ arg1 ] = getArgsArr(inputStr, 1);
    const filePath = await buildPath(arg1);
    const writeStream = createWriteStream(filePath);
    writeStream.end();
    stdout.write(`File ${filePath} successfully created!`);
  } catch(err) {
    handleErrors(err);
  }
};
