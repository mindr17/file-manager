import { fileManagerModel } from './FileManagerModel.js';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';
import { hash } from './hash.js';
import { add } from './add.js';

class FileManagerController {
  constructor() {}

  getCurrentDir() {
    return fileManagerModel.currentDir;
  }

  setCurrentDir(path) {
    fileManagerModel.currentDir = path;
  }

  async up(args) {
    await up(args);
  }

  async cd(args) {
    await cd(args);
  }

  async ls(args) {
    await ls(args);
  }

  async cat(args) {
    await cat(args);
  }

  async add(args) {
    await add(args);
  }

  async compress(args) {
    await compress(args);
  }

  async decompress(args) {
    await decompress(args);
  }

  async hash(args) {
    await hash(args);
  }
}
export const fileManagerController = new FileManagerController();
