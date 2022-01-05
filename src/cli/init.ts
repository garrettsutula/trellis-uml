import * as path from 'path';
import { writeFile, mkdir, access } from 'fs/promises';
import { execSync } from 'child_process';
import eslintConfig from './templates/eslintrc';
import gitignoreConfig from './templates/gitignore';
import tsConfig from './templates/tsconfig';

const workingDirectoryPath = process.cwd();

export async function initializeProject() {
  console.log("Running 'npm init' to initialize project folder...");
  try {
    await access('./package.json');
    console.log('package.json already exists, skipping initialization (wrong folder or already initialized?)');
  } catch (e) {
    try {
      await execSync('npm init -y');
    } catch (err) {
      throw new Error("Error running 'npm init'.");
    }
    console.log('Installing npm dependencies & dev dependencies for project...');
    try {
      execSync('npm install --save trellisuml');
      execSync('npm install --save-dev typescript');
      execSync('npm install --save-dev eslint');
    } catch (err) {
      throw new Error('Error installing project dependencies from latest available on npm.');
    }
    console.log('Initializing typescript and eslint config.');
    try {
      await Promise.all([
        writeFile('./eslintrc.js', eslintConfig),
        writeFile('./.gitignore', gitignoreConfig),
        writeFile('./tsconfig.json', tsConfig),
      ]);
    } catch (err) {
      throw new Error('Error copying configuration template files into project.');
    }
    console.log('Creating diagram source code folder structure...');
    try {
      mkdir(path.join(workingDirectoryPath, './src'));
      mkdir(path.join(workingDirectoryPath, './src/systems'));
      mkdir(path.join(workingDirectoryPath, './src/services'));
      mkdir(path.join(workingDirectoryPath, './src/solutions'));
      mkdir(path.join(workingDirectoryPath, './src/domains'));
    } catch (err) {
      throw new Error('Error creating directory structure for diagram source code.');
    }
    console.log('**********************************');
    console.log('Project Initialization Successful!');
    console.log('**********************************');
  }
}
