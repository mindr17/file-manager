import { fileManagerController } from './FileManagerController.js';
import { getArgsArr, getFullPath } from './util.js';

export const cd = async (inputStr) => {
  try {
    const [arg1] = getArgsArr(inputStr, 1);
    const newPath = await getFullPath(arg1);
    fileManagerController.setCurrentDir(newPath);
  } catch(err) {
    console.error(`Invalid input!\ncd: no such directory: ${inputStr}`);
  }
};
