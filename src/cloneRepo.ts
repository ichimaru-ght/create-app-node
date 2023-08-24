import shelljs from 'shelljs';
import fs from 'fs';
import ora from 'ora';

const cloneRepo = (name: string, currentPath: string) => {
  const spinner = ora('Initializing Project..');
  spinner.start();
  shelljs.cd(currentPath);
  shelljs.exec('git clone --branch template https://github.com/ichimaru-ght/create-app-node.git', {
    async: false,
    silent: true,
  });
  shelljs.cd('create-app-node');
  shelljs.cd('..');
  fs.renameSync('create-app-node', name);
  spinner.stop();
  return `${currentPath}/${name}`;
};

export default cloneRepo;
