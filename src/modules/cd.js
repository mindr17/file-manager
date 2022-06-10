import { homedir } from 'os';
import { fileManager } from './FileManager.js';
import fsPromises from 'fs';

export const cd = async (argsArr) => {
  try {
    if (argsArr.length === 0) {
      fileManager.currentDir = homedir();
      return;
    }
    if (argsArr.length > 1) throw new Error('Invalid input');
    const argsStr = argsArr.toString();

    fsPromises.stat(path, (error, stats) => {
      if (error) {
        throw new Error('Invalid input');
      }
      console.log(stats.isDirectory());
    });

    const checkIfFolderExists = async (folderPath) => {
      try {
          await fs.promises.access(folderPath, fs.constants.F_OK)
          return true;
      } catch (e) {
          return false;
      }
    };

    const oldDir = fileManager.currentDir;

    const getNewDir = (oldDir, argsStr) => {
      if (argsStr.startsWith('/')) {
        return argsStr;
      } else {
        return oldDir + '/' + argsStr;
      }
    };

    const newDir = getNewDir();

    fsPromises.stat(newDir, (error, stats) => {
      if (error || !stats.isDirectory()) {
        throw new Error('Invalid input');
      }
    });
    fileManager.currentDir = getNewDir(oldDir, argsStr);

    // const direntsArr = fsPromises.readdir(currentPath, {
    //   withFileTypes: true,
    // });
    // for (const dirent of direntsArr) {
      //   if (dirent.isFolder() && dirent.name === argsStr) {
        //     fileManager.currentDir = getNewDir(oldDir, argsStr);
        //   }
    // }
    
  } catch(err) {
    throw new Error('Invalid input');
  }
};
