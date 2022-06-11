import { createReadStream, promises as fsPromises } from 'fs';
import path from 'path';
import { stdout } from 'process';
import { checkArgsCount } from './util.js';
import { createHash } from 'crypto';
import { fileManager } from './FileManager.js';

export const hash = async (argsStr) => {
  try {
    const argsAreCorrect = checkArgsCount(argsStr, 1);
    console.log('argsAreCorrect: ', argsAreCorrect);
    const currentDir = fileManager.currentDir;
    const filePath = path.join(currentDir, argsStr);

    const stream = createReadStream(filePath, 'utf8');
    // stream.on('readable', async () => {
    //   let buffer = await stream.read();
    //   if (buffer) {
    //     const contents = buffer.toString();
    //     const hash = createHash('sha256');
    //     const myHash = hash.update(contents);
    //     const hex = myHash.digest('hex');
    //     stdout.write(`${hex}\n`);
    //   }
    // });
    
    // stream.on('readable', async () => {
    //   let buffer = await stream.read();
    //   if (buffer) {
    //     const contents = buffer.toString();
    //     const hash = createHash('sha256');
    //     const myHash = hash.update(contents);
    //     const hex = myHash.digest('hex');
    //     stdout.write(`${hex}\n`);
    //   }
    // });

    // var fd = fs.createReadStream('/some/file/name.txt');
    // var hash = crypto.createHash('sha1');
    // hash.setEncoding('hex');
    // // read all file and pipe it (write it) to the hash object
    // fd.pipe(hash);

    const contents = await new Promise((resolve, reject) => {
      stream.on('end', () => resolve(stream.read()));
    });
    
    console.log('contents: ', contents);

  } catch(err) {
    console.error(`Operation failed!\n${err}`);
  }
};
