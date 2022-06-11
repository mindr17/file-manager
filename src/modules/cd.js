import { homedir } from 'os';
import { fileManager } from './FileManager.js';
import fsPromises from 'fs/promises';
import path from 'path';

export const cd = async (inputStr) => {
  try {
    if (inputStr.length === 0) {
      fileManager.currentDir = homedir();
      return;
    }
    
    const argsArr = inputStr.split(' ');
    console.log('argsArr: ', argsArr);
    if (argsArr.length > 1) {
      console.error('Invalid input! Expecting string without spaces!');
      return;
    }

    const oldDir = fileManager.currentDir;

    const getNewDir = (oldDir, inputStr) => {
      if (inputStr.startsWith('/')) {
        return inputStr;
      } else {
        return path.join(oldDir, inputStr);
      }
    };
    
    const newDir = getNewDir(oldDir, inputStr);

    const stats = await fsPromises.stat(newDir);

    if (!stats.isDirectory()) {
      console.error('Invalid input! No such directorhy!');
      return;
    }

    fileManager.currentDir = getNewDir(oldDir, inputStr);
  } catch(err) {
    console.error('Invalid input\n' + err);
  }
};
