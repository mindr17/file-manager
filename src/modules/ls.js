import fsPromises from 'fs/promises';
import { fileManager } from './FileManager.js';

export const ls = async (argsArr, silent = false) => {
  try {
    console.log('argsArr: ', argsArr);
    if (argsArr.length > 0) throw new Error('Invalid input');
    const currentPath = fileManager.currentDir;
    const direntsArr = await fsPromises.readdir(currentPath, {
      withFileTypes: true,
    });
    for (const dirent of direntsArr) {
      if (!silent) console.log(dirent.name);
    }
  } catch (err) {
    throw new Error('Invalid input')
  }
};
