import fs from 'fs';

export const checkIfFileExists = async (filePath) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK)
    return true;
  } catch (e) {
    return false;
  }
};

// export const 
