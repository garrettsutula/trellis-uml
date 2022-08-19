import * as path from 'path';
import { access, cp, readFile } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';
import * as prompt from 'prompt';
import logger from '../common/logger';

export async function initializeProject(type) {
  type = type || 'uml';
  const templatePath = path.join(__dirname, `./project-templates/${type}/`);
  logger.info(chalk.bold("⚙️ Running 'npm init' to initialize project folder..."));
  let alreadyInitialized = false;

  // Test for project template path, early return for bad cli arg.
  try {
    await access(templatePath);
  } catch (err) {
    logger.error(`⛔️ Project template type: '${type}' does not exist.`, err);
  }

  // Test for presence of package.json (i.e. project already initialized or possible wrong folder), init if needed.
  try {
    await access('./package.json');
    const packageInfo = await JSON.parse((await readFile('./package.json')).toString());
    if (packageInfo?.dependencies?.trellisuml) alreadyInitialized = true;
    else {
      logger.error('⛔️ package.json already exists but "trellisuml" isn\'t a listed dependency, wrong folder?');
    }
    logger.info('⚠️ trellis project already exists, skipping initialization.');
  } catch (e) {
    // Noop, alreadyInitialized is already set to 'false'
  }

  // Run npm init & npm install if not already initialized.
  if (!alreadyInitialized) {
    try {
      execSync('npm init -y');
      execSync('npm pkg set scripts.build="trellis build"');
      execSync('npm pkg set scripts.watch="trellis watch"');
    } catch (err) {
      logger.error('⛔️ Error running \'npm init\'', err);
      throw err;
    }
    logger.info(chalk.bold("⚙️ Running 'npm install' to install project dependencies."));
    try {
      execSync('npm install --save trellisuml');
    } catch (err) {
      logger.error('⛔️ Error installing project dependencies from latest available on npm', err);
      throw err;
    }
  }

  if (alreadyInitialized) {
    // Prompt user to overwrite schemas, templates, processors from trellisuml templates.
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
      logger.info(chalk.bold(`⚙️ Updating project from latest template files '${type}'...`));
      try {
        await Promise.all([
          cp(path.join(templatePath, './processors/'), './processors/', { recursive: true }),
          cp(path.join(templatePath, './schemas/'), './schemas/', { recursive: true }),
          cp(path.join(templatePath, './templates/'), './templates/', { recursive: true }),
        ]);
      } catch (err) {
        logger.error('⛔️ Error updating template files in existing project.', err);
        throw err;
      }
    } else logger.info('⚠️ trellis project already exists, user chose not to update from project template.');
  } else {
    // Just copy project files from template folder.
    logger.info(chalk.bold(`⚙️ Copying project template '${type}'...`));
    try {
      await cp(templatePath, './', {
        recursive: true,
      });
    } catch (err) {
      logger.error('⛔️ Error copying configuration template files into project.', err);
      throw err;
    }
  }
  logger.info(chalk.bold.green('✅ Project Initialization Successful!'));
}
