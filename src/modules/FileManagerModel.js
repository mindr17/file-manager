import { homedir } from 'os';

class FileManagerModel {
  constructor() {
    this._currentDir = homedir();
  }

  get currentDir() {
    return this._currentDir;
  }

  set currentDir(path) {
    this._currentDir = path;
  }

}
export const fileManagerModel = new FileManagerModel();
