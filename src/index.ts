#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import cloneRepo from './cloneRepo';
import { resolve } from 'path';
import fs from 'fs';
import shelljs from 'shelljs';
import colors from '@colors/colors/safe';

const main = async () => {
  const projectName = await input({ message: 'Enter your project name', default: 'myNodeProject' });
  const author = await input({ message: 'Enter author (Optional)' });
  const gitRepo = await input({ message: 'Enter gitRepo (Optional)' });

  const currentPath = resolve('./');
  const projectPath = await cloneRepo(projectName, currentPath);

  const packageStr = fs.readFileSync(`${projectPath}/package.json`).toString();
  const packageJson = JSON.parse(packageStr);
  packageJson.author = author;
  packageJson.name = projectName;
  if (gitRepo) {
    packageJson.repository = { type: 'git', url: gitRepo };
  }
  const modifiedPackage = JSON.stringify(packageJson);
  fs.writeFileSync(`${projectPath}/package.json`, modifiedPackage);
  shelljs.cd(projectName);
  shelljs.exec('rm -rf .git');
  if (gitRepo) {
    console.log(colors.green('绑定远程仓库'));
    shelljs.exec(`git remote add origin ${gitRepo}`);
  }
  console.log(colors.green('开始安装依赖'));
  shelljs.exec('yarn');
  console.log(colors.green('项目初始化完成'));
};

main();
