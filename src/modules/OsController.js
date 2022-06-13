import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { stdout } from 'process';

class OsController {
  constructor() {}

  eol() {
    const eolStr = JSON.stringify(EOL);
    stdout.write(eolStr);
  }
  
  cpus() {
    const cpusArr = cpus();
    console.log(`Overall amount of cpus: ${cpusArr.length}`);
    for (const cpuObj of cpusArr) {
      console.log(cpuObj.model);
    }
  }

  homedir() {
    const homeDirStr = homedir();
    console.log(`Home Directory is: ${homeDirStr}`);
  }

  username () {
    const systemUserName = userInfo().username;
    console.log(`System Username is: ${systemUserName}`);
  }

  architecture () {
    console.log(`Your CPU architecture is: ${arch()}`);
  }
}

export const osController = new OsController();
