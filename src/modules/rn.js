import { rename } from 'fs/promises';
import { getArgsArr, buildPath, getFullPath, handleErrors } from './util.js';

export const rn = async (argsStr) => {
  try {
    const [ arg1, arg2 ] = getArgsArr(argsStr, 2);
    const fromPath = await getFullPath(arg1, 'file');
    const toPath = buildPath(arg2);
    
    await rename(fromPath, toPath);
  } catch(err) {
    handleErrors(err);
  }
};
