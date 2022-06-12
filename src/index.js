import { argv, stdin, stdout, exit } from 'process';
import { createInterface } from 'readline';
import { fileManagerController } from './modules/FileManagerController.js';

const main = async () => {
  try {
    const getUserName = (argsArr) => {
      const usernameArr = argsArr.filter(item => item.startsWith('--username'));
      const usernameStr = usernameArr.toString();
      const usernameNotCapitalized = usernameStr.slice(11);
      const username = 
        usernameNotCapitalized.charAt(0).toUpperCase() +
        usernameNotCapitalized.slice(1);
      return username;
    }
    const username = getUserName(argv);
    stdout.write(`Welcome to the File Manager, ${username}!\n`);
    
    const rl = createInterface({
      input: stdin,
    });
    rl.on('close', () => {
      stdout.write(`Thank you for using File Manager, ${username}\n`);
      exit();
    });
    rl.on('SIGINT', () => rl.close());

    const handleInput = async (answerStr) => {
      try {
        const getOperationName = (answerStr) => {
          const spaceIndex = answerStr.indexOf(' ');
          if (spaceIndex > 0) {
            const spaceIndex = answerStr.indexOf(' ');
            const operationName = answerStr.slice(0, spaceIndex);
            const argsStr = answerStr.slice(spaceIndex + 1, answerStr.length);
            return [operationName, argsStr];
          } else {
            return [answerStr, ''];
          }
        };
        const [operationName, argsStr] = getOperationName(answerStr);
        const operation = fileManagerController[operationName];
        if (operation === undefined) {
          console.error('Invalid input! No such command.');
          return;
        }
        await operation(argsStr);
      } catch (err) {
        console.error(err);
      }
    };

    const ask = async () => {
      stdout.write(`You are currently in ${fileManagerController.getCurrentDir()}\n`);
      rl.question('', async (answer) => {
        if (answer != '.exit') {
          await handleInput(answer);
          await ask();
        }
        else {
          rl.close();
        }
      });
    };
    await ask();

  } catch(err) {
    console.error(`Operation failed! Something went wrong on top level.\n${err}`);
  }
};
main();
