import * as path from 'path';
import { access, cp, readFile } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';
import * as prompt from 'prompt';

export async function initializeProject(type) {
  const templatePath = path.join(__dirname, `./project-templates/${type || 'default'}/`);
  console.log(chalk.bold("⚙️\tRunning 'npm init' to initialize project folder..."));
  let alreadyInitialized = false;

  // Test for project template path, early return for bad cli arg.
  try {
    await access(templatePath);
  } catch (err) {
    throw new Error(`Project template type: '${type || 'default'}' does not exist.`);
  }

  // Test for presence of package.json (i.e. project already initialized or possible wrong folder), init if needed.
  try {
    await access('./package.json');
    const packageInfo = await JSON.parse((await readFile('./package.json')).toString());
    if (packageInfo?.dependencies?.trellisuml) alreadyInitialized = true;
    else {
      console.log('⛔️\tpackage.json already exists but "trellisuml" isn\'t a listed dependency, wrong folder?');
    }
    console.log('⚠️\ttrellis project already exists, skipping initialization.');
  } catch (e) {
    // Noop, alreadyInitialized is already set to 'false'
  }

  // Run npm init & npm install if not already initialized.
  if (!alreadyInitialized) {
    try {
      execSync('npm init -y');
    } catch (err) {
      throw new Error(`⛔️\tError running 'npm init'.\n${JSON.stringify(err)}`);
    }
    console.log(chalk.bold("⚙️\tRunning 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
    } catch (err) {
      throw new Error(`⛔️\tError installing project dependencies from latest available on npm:\n${JSON.stringify(err)}`);
    }
  }

  if (alreadyInitialized) {
    // Prompt user to overwrite schemas, templates, preprocessors from trellisuml templates.
    // Used for updating projects in-place to add features.
    // TODO: Examine how ng-cli does this including code refactors.
    prompt.start();
    const { question: userConfirmation } = await prompt.get({
      pattern: /[y|n]?/,
      message: 'Response must be either "y" or "n" or nothing (default "y")',
      description: 'Project already initialized, do you want to re-copy everything BUT "models" from the project template? (y)',
      before(value) {
        return value !== 'n';
      },
    });

    if (userConfirmation) {
      console.log(chalk.bold(`⚙️\tUpdating project from latest template files '${type || 'default'}'...`));
      try {
        await Promise.all([
          cp(path.join(templatePath, './preprocessors/'), './preprocessors/', { recursive: true }),
          cp(path.join(templatePath, './schemas/'), './schemas/', { recursive: true }),
          cp(path.join(templatePath, './templates/'), './templates/', { recursive: true }),
        ]);
      } catch (err) {
        throw new Error(`⛔️\tError updating template files in existing project:\n${JSON.stringify(err)}`);
      }
    } else console.log('⚠️\ttrellis project already exists, user chose not to update from project template.');
  } else {
    // Just copy project files from template folder.
    console.log(chalk.bold(`⚙️\tCopying project template '${type || 'default'}'...`));
    try {
      await cp(templatePath, './', {
        recursive: true,
      });
    } catch (err) {
      throw new Error(`⛔️\tError copying configuration template files into project:\n${JSON.stringify(err)}`);
    }
  }
  console.log(chalk.bold.green('✅\tProject Initialization Successful!'));
}
