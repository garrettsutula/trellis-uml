import * as path from 'path';
import { access, cp } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';

export async function initializeProject(type) {
  console.log(chalk.bold("⚙️\tRunning 'npm init' to initialize project folder..."));
  try {
    await access('./package.json');
    console.log('🛑\tpackage.json already exists, skipping initialization (wrong folder or already initialized?)');
  } catch (e) {
    try {
      execSync('npm init -y');
    } catch (err) {
      throw new Error(`⛔️\tError running 'npm init'.\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold("⚙️ Running 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
    } catch (err) {
      throw new Error(`⛔️\tError installing project dependencies from latest available on npm:\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold(`⚙️\tCopying project template '${type || 'default'}'...`));
    try {
      await access(`./project-templates/project-types/${type || 'default'}/`);
    } catch (err) {
      throw new Error(`Project template type: '${type || 'default'}' does not exist.`);
    }
    try {
      await cp(path.join(__dirname, `./project-templates/project-types/${type || 'default'}/`), './', { recursive: true });
    } catch (err) {
      throw new Error(`⛔️\tError copying configuration template files into project:\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold.green('✅\tProject Initialization Successful!'));
  }
}
