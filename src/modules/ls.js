import fsPromises from 'fs/promises';
import { fileManagerController } from './FileManagerController.js';
import { getArgsArr, handleErrors } from './util.js';

export const ls = async (argsStr) => {
  try {
    getArgsArr(argsStr, 0);
    const currentPath = fileManagerController.getCurrentDir();

    const direntsArr = await fsPromises.readdir(currentPath, {
      withFileTypes: true,
    });
    console.log('List of files:')
    for (const dirent of direntsArr) {
      console.log(dirent.name);
    }
  } catch (err) {
    handleErrors(err);
  }
};
