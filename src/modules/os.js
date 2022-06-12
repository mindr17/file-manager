import { osController } from './OsController.js';
import { getArgsArr, handleErrors, InputError } from './util.js';

export const os = async (argsStr) => {
  try {
    const [ arg1 ] = getArgsArr(argsStr, 1);
    if (!arg1.startsWith('--')) {
      throw new InputError(`Invalid input! Os commands must start with double dashes.`);
    }
    const infoTypeOfAnyCase = arg1.slice(2);
    const infoType = infoTypeOfAnyCase.toLowercase();

    const osOperation = osController[infoType];
    if (osOperation === undefined) {
      throw new InputError('Invalid input! No such type of operating system info.');
    }
    await osOperation(argsStr);

  } catch(err) {
    handleErrors(err);
  }
};
