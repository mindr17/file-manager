import { homedir } from 'os';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';
import { hash } from './hash.js';

class FileManager {
  constructor() {
    this._currentDir = homedir();
  }

  get currentDir() {
    return this._currentDir;
  }

  set currentDir(path) {
    this._currentDir = path;
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
export const fileManager = new FileManager();
