import { createWriteStream } from 'fs';
import { getArgsArr, buildPath, handleErrors } from './util.js';
import { pipeline } from 'stream/promises';
import { stdin } from 'process';

export const add = async (inputStr) => {
  try {
    const [ arg1 ] = getArgsArr(inputStr, 1);
    const filePath = await buildPath(arg1);
    createWriteStream(filePath);
  } catch(err) {
    handleErrors(err);
  }
};
