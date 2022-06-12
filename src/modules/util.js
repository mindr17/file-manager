import { join, isAbsolute } from 'path';
import { stat } from 'fs/promises';
import { fileManagerController } from './FileManagerController.js';

export class InputError extends Error {}
export class OperationError extends Error {}
export const handleErrors = (err) => {
  if (err instanceof InputError || err instanceof OperationError) {
    console.error(err);
  } else {
    console.error(`Operation failed!\n${err}`);
  }
};

export const getArgsArr = (argsStr, argsCount) => {
  if (argsStr.length === 0) {
    if (argsCount === 0) {
      return '';
    } else {
      throw new InputError(
       `Invalid input! Expecting exactly ${argsCount} ${(argsCount === 1) ? 'argument' : 'arguments'} for this command.`
      );
    }
  }
  
  const argsArr = argsStr.split(' ');
  if (argsArr.length !== argsCount) {
    throw new InputError(
      `Invalid input! Expecting exactly ${argsCount} ${(argsCount === 1) ? 'argument' : 'arguments'} for this command.`
    );
  } else {
    return argsArr;
  }
};

export const buildPath = (pathStr) => {
  try {
    if (isAbsolute(pathStr)) {
      return pathStr;
    } else {
      const currentPath = fileManagerController.getCurrentDir();
      const newPath = join(currentPath, pathStr);
      return newPath;
    }
  } catch(err) {
    throw new InputError(`Invalid input! Error building path.`);
  }
};

export const getFullPath = async (pathStr, type) => {
  try {
    const newPath = buildPath(pathStr);
    const checkTypeAndExistence = async (filePath, type) => {
      const stats = await stat(filePath);
      if (type === 'file' && !stats.isFile()) {
        throw new InputError(`Invalid input! Not a file.`);
      }
      if (type === 'folder' && !stats.isFolder()) {
        throw new InputError(`Invalid input! Not a folder.`);
      }
    };
    await checkTypeAndExistence(newPath, type);
    return newPath;
  } catch (err) {
    throw new InputError(`Invalid input! No such file or directory.`);
  }
};
