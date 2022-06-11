import fsPromises from 'fs/promises';
import { fileManager } from './FileManager.js';

export const ls = async (inputStr) => {
  try {
    if (inputStr.length > 0) {
      console.error('Invalid input! Expecting no arguments.');
      return;
    }

    const currentPath = fileManager.currentDir;
    const direntsArr = await fsPromises.readdir(currentPath, {
      withFileTypes: true,
    });
    for (const dirent of direntsArr) {
      console.log(dirent.name);
    }
  } catch (err) {
    throw new Error('Invalid input')
  }
};
