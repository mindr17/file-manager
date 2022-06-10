import { homedir } from 'os';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';

class FileManager {
  constructor() {
    this.currentDir = homedir();
  }

  up(args) {
    up(args);
  }

  cd(args) {
    cd(args);
  }

  async ls(args) {
    await ls(args);
  }
}
export const fileManager = new FileManager();
