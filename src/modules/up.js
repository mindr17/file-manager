import { fileManager } from './FileManager.js';

export const up = (inputStr) => {
  if (inputStr.length > 0) throw new Error('Invalid input');
  try {
    const dirArr = fileManager.currentDir.split('/');
    if (dirArr[1] === '') throw new Error('Operation failed');
    const length = dirArr.length;
    const currentDirArr = dirArr.slice(0, length - 1);
    const currentDir = currentDirArr.join('/');
    if (currentDir !== '') {
      fileManager.currentDir = currentDir;
    } else {
      fileManager.currentDir = '/';
    }
  } catch(err) {
    throw new Error('Operation failed');
  }
};
