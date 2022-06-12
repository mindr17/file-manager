import { fileManagerModel } from './FileManagerModel.js';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';
import { cp } from './cp.js';
import { mv } from './mv.js';
import { rm } from './rm.js';
import { os } from './os.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';
import { hash } from './hash.js';

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

  async rn(args) {
    await rn(args);
  }

  async cp(args) {
    await cp(args);
  }

  async mv(args) {
    await mv(args);
  }

  async rm(args) {
    await rm(args);
  }

  async os(args) {
    await os(args);
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
