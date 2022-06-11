import fs from 'fs';

export const checkIfFileExists = async (filePath) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK)
    return true;
  } catch (e) {
    return false;
  }
};
  
// TODO: add handling absolute paths

export const checkArgsCount = (argsStr, count) => {
  if (argsStr.length === 0 && count !== 0) return false;
  const argsArr = argsStr.split(' ');
  if (argsArr.length === count) return true;
  return false;
}
