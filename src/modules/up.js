import { parse } from 'path';
import { fileManagerController } from './FileManagerController.js';
import { getArgsArr, handleErrors } from './util.js';

export const up = async (argsStr) => {
  try {
    getArgsArr(argsStr, 0);
    const oldPath = fileManagerController.getCurrentDir();
    const parsed = parse(oldPath);
    const newPath = parsed.dir;
    fileManagerController.setCurrentDir(newPath);
  } catch(err) {
    handleErrors(err);
  }
};
