import * as path from 'path';
import { writeFile, mkdir, access } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';

import gitignoreConfig from './project-templates/gitignore';
import launchConfig from './project-templates/launch';

const workingDirectoryPath = process.cwd();

export async function initializeProject(type) {
  if (type) console.log(chalk.bold.yellow('Project types not implemented yet.'));
  console.log(chalk.bold("***Running 'npm init' to initialize project folder..."));
  try {
    await access('./package.json');
    console.log('package.json already exists, skipping initialization (wrong folder or already initialized?)');
  } catch (e) {
    try {
      execSync('npm init -y');
      execSync('npm pkg set description="A diagramming project made using the TrellisUML Framework."');
    } catch (err) {
      throw new Error("Error running 'npm init'.");
    }
    console.log(chalk.bold("***Running 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
    } catch (err) {
      throw new Error('Error installing project dependencies from latest available on npm.');
    }
    console.log(chalk.bold('***Creating diagram source code folder structure...'));
    try {
      await Promise.all([
        mkdir(path.join(workingDirectoryPath, './models')),
        mkdir(path.join(workingDirectoryPath, './schemas')),
        mkdir(path.join(workingDirectoryPath, './preprocessors')),
        mkdir(path.join(workingDirectoryPath, './templates')),
      ]);
    } catch (err) {
      throw new Error(`Error creating project directory structure.\n${JSON.stringify(e)}`);
    }
    console.log(chalk.bold('***Initializing typescript and eslint config.'));
    try {
      await mkdir(path.join(workingDirectoryPath, './.vscode'));
      await Promise.all([
        writeFile('./.gitignore', gitignoreConfig),
        writeFile('./.vscode/settings.json', launchConfig),
      ]);
    } catch (err) {
      throw new Error('Error copying configuration template files into project.');
    }

    console.log(chalk.bold.green('**********************************'));
    console.log(chalk.bold.green('Project Initialization Successful!'));
    console.log(chalk.bold.green('**********************************'));
  }
}
