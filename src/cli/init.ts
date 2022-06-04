import * as path from 'path';
import { access, cp } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';

export async function initializeProject(type) {
  console.log(chalk.bold("⚙️ Running 'npm init' to initialize project folder..."));
  try {
    await access('./package.json');
    console.log('🛑 package.json already exists, skipping initialization (wrong folder or already initialized?)');
  } catch (e) {
    try {
      execSync('npm init -y');
    } catch (err) {
      throw new Error(`⛔️ Error running 'npm init'.\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold("⚙️ Running 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
    } catch (err) {
      throw new Error(`⛔️ Error installing project dependencies from latest available on npm:\n${JSON.stringify(err)}`);
    }

    // copy base template
    // copy template for project type, just do default for now.

    console.log(chalk.bold('⚙️ Copying base project template...'));
    try {
      await cp(path.join(__dirname, './project-templates/base/'), './', { recursive: true });
    } catch (err) {
      throw new Error(`⛔️ Error copying base project template:\n${JSON.stringify(e)}`);
    }
    console.log(chalk.bold('⚙️ Initializing typescript and eslint config.'));
    try {
      await cp(path.join(__dirname, `./project-templates/project-types/${type || 'default'}/`), './', { recursive: true });
    } catch (err) {
      throw new Error(`⛔️ Error copying configuration template files into project:\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold.green('✅ Project Initialization Successful!'));
  }
}
