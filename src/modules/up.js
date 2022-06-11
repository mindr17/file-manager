import { fileManagerController } from './FileManagerController.js';

export const up = async (inputStr) => {
  try {
    checkArgsCount(inputStr, 0);
    const dirArr = fileManagerController.getCurrentDir().split('/');
    if (dirArr[1] === '') throw new Error('Operation failed');
    const length = dirArr.length;
    const currentDirArr = dirArr.slice(0, length - 1);
    const currentDir = currentDirArr.join('/');
    if (currentDir !== '') {
      fileManagerController.currentDir = currentDir;
    } else {
      fileManagerController.currentDir = '/';
    }
  } catch(err) {
    throw new Error('Operation failed');
  }
};
