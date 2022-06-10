import process, { argv, stdout, exit } from 'process';
import { dirname } from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { fileManager } from './modules/FileManager.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
  try {
    const usernameArr = argv.filter(item => item.startsWith('--username'));
    const usernameStr = usernameArr.toString();
    const usernameNotCapitalized = usernameStr.slice(11);
    const username = usernameNotCapitalized.charAt(0).toUpperCase() + usernameNotCapitalized.slice(1);
    stdout.write(`Welcome to the File Manager, ${username}!\n`);
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.on('SIGINT', () => rl.close());
    rl.on('close', () => {
      stdout.write(`Thank you for using File Manager, ${username}\n`);
      exit();
    });

    const printHomeDir = () => {
      const homeDirPath = fileManager.currentDir;
      stdout.write(`You are currently in ${homeDirPath}\n`);
    };

    const handleInput = async (answer) => {
      try {
        const inputArr = answer.split(' ');
        const operationName = inputArr[0];
        const argumentsArr = inputArr.slice(1);
        const operation = fileManager[operationName];
        if (operation === undefined) throw new Error('Invalid input');
        await operation(argumentsArr);
      } catch (err) {
        console.error(err);
      }
    };
    
    const ask = () => {
      printHomeDir();
      rl.question('', (answer) => {
        if (answer != '.exit') {
          handleInput(answer);
          ask();
        }
        else {
          rl.close();
        }
      });
    };
    ask();

  } catch(err) {
    throw new Error (err);
  }

};

main();
