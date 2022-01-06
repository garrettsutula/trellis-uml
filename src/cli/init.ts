import * as path from 'path';
import { writeFile, mkdir, access } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';

import eslintConfig from './project-templates/eslintrc';
import gitignoreConfig from './project-templates/gitignore';
import swcConfig from './project-templates/swcrc';
import launchConfig from './project-templates/launch';
import appMain from './project-templates/app';

const workingDirectoryPath = process.cwd();

export async function initializeProject() {
  console.log(chalk.bold("***Running 'npm init' to initialize project folder..."));
  try {
    await access('./package.json');
    console.log('package.json already exists, skipping initialization (wrong folder or already initialized?)');
  } catch (e) {
    try {
      execSync('npm init -y');
      execSync('npm set-script build "swc ./src -d dist"');
      execSync('npm set-script lint "eslint . --ext .ts"');
      execSync('npm pkg set main=./dist/app.js');
      execSync('npm pkg set description="A diagramming project made using the TrellisUML Framework."');
    } catch (err) {
      throw new Error("Error running 'npm init'.");
    }
    console.log(chalk.bold("***Running 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
      execSync('npm install --save-dev typescript');
      execSync('npm install --save-dev eslint');
      execSync('npm install --save-dev @swc/core');
      execSync('npm install --save-dev @swc/cli');
      execSync('npm install --save-dev @types/node');
    } catch (err) {
      throw new Error('Error installing project dependencies from latest available on npm.');
    }
    console.log(chalk.bold('***Creating diagram source code folder structure...'));
    try {
      await Promise.all([
        mkdir(path.join(workingDirectoryPath, './src/systems'), { recursive: true }),
        mkdir(path.join(workingDirectoryPath, './src/services'), { recursive: true }),
        mkdir(path.join(workingDirectoryPath, './src/solutions'), { recursive: true }),
        mkdir(path.join(workingDirectoryPath, './src/domains'), { recursive: true }),
      ]);
    } catch (err) {
      throw new Error('Error creating directory structure for diagram source code.');
    }
    console.log(chalk.bold('***Initializing typescript and eslint config.'));
    try {
      await mkdir(path.join(workingDirectoryPath, './.vscode'));
      await Promise.all([
        writeFile('./.eslintrc.js', eslintConfig),
        writeFile('./.gitignore', gitignoreConfig),
        writeFile('./.swcrc', swcConfig),
        writeFile('./.vscode/launch.json', launchConfig),
        writeFile('./src/app.ts', appMain),
        writeFile('./src/systems/index.ts', ''),
        writeFile('./src/domains/index.ts', ''),
      ]);
    } catch (err) {
      throw new Error('Error copying configuration template files into project.');
    }

    console.log(chalk.bold.green('**********************************'));
    console.log(chalk.bold.green('Project Initialization Successful!'));
    console.log(chalk.bold.green('**********************************'));
  }
}
