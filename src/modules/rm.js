import { rm as rmPromise } from 'fs/promises';
import { getArgsArr, getFullPath, handleErrors } from './util.js';

export const rm = async (argsStr) => {
  try {
    const [ arg1 ] = getArgsArr(argsStr, 1);
    const filePath = await getFullPath(arg1, 'file');
    
    await rmPromise(filePath);

  } catch(err) {
    handleErrors(err);
  }
};
