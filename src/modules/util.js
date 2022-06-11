import { join, isAbsolute } from 'path';
import { promises as fsPromises } from 'fs';
import { fileManagerController } from './FileManagerController.js';

export class InputError extends Error {}

export class OperationError extends Error {}

export const getArgsArr = (argsStr, argsCount) => {
  if (argsStr.length === 0) {
    if (argsCount === 0) {
      return '';
    } else {
      throw new InputError(`Invalid input! Expecting exactly ${argsCount} arguments for this command.`);
    }
  }
  const argsArr = argsStr.split(' ');
  if (argsArr.length !== argsCount) {
    throw new InputError(`Invalid input! Expecting exactly ${argsCount} arguments for this command.`);
  } else {
    return argsArr;
  }
};

export const getFullPath = async (pathStr, type) => {
  const getAbsulutePath = (pathStr) => {
    if (isAbsolute(pathStr)) {
      // throw new InputError(`Invalid input! No such path.`);
      return pathStr;
    } else {
      const currentPath = fileManagerController.getCurrentDir();
      const newPath = join(currentPath, pathStr);
      return newPath;
    }
  }
  const newPath = getAbsulutePath(pathStr);

  const checkTypeAndExistence = async (filePath, type) => {
    try {
      const stats = await fsPromises.stat(filePath);
    } catch (err) {
      throw new InputError(`Invalid input! No such file or directory.`);
    }
    if (type === 'file' && !stats.isFile()) {
      throw new InputError(`Invalid input! No not a file.`);
    } else if (type === 'folder' && !stats.isFolder()) {
      throw new InputError(`Invalid input! No not a folder.`);
    }
  };
  await checkTypeAndExistence(newPath, type);

  return newPath;
};
