import * as path from 'path';
import { rm } from 'fs/promises';
import chalk from 'chalk';
import * as chokidar from 'chokidar';

import  build from './build';
import { getScripts } from '../processors';
import { getTemplates, registerPartials } from '../templates';
import logger from '../common/logger';

import {BuilderContext} from '../project';

// TODO: watch each folder type and trigger more efficient build process

let currentBuilderContext: BuilderContext;

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(evt, filePath) {
  const splitPath = filePath.split(path.sep);
  const [fileType, type ] = splitPath;
  const fileName = splitPath[splitPath.length - 1].split('.')[0];
  logger.info(chalk.dim(`👀 ${evt === 'unlink' ? 'DELETE': evt.toUpperCase()} detected on: ${filePath}`));
  if (currentBuilderContext) {
    const isKnownModelType = Object.keys(currentBuilderContext.modelPaths).includes(type);
    switch(`${evt}-${fileType}`) {
      case 'add-models':
        if (isKnownModelType)
          currentBuilderContext.modelPaths[type].push(filePath);
        else
          logger.warn(chalk.dim(`File ${filePath} not in one of the model type subfolders, skipping processing this file...`));
        break;
      case 'add-processors':
        const newScripts = await getScripts([filePath]);
        currentBuilderContext.scripts = Object.assign(currentBuilderContext.scripts, newScripts);
        break;
      case 'change-processors':
        logger.warn(chalk.dim(`Processor script can't be hot reloaded in this version (feature dev required).`));
        break;
      case 'add-schemas':
        currentBuilderContext.schemaPaths[fileName] = filePath;
        break;
      case 'add-templates':
      case 'change-templates':
        if (filePath.includes('partials')) {
          logger.debug(chalk.dim(`Reregistering partials...`));
          await registerPartials();
        } else {
          const newTemplates = await getTemplates([ filePath ]);
          currentBuilderContext.templates = Object.assign(currentBuilderContext.templates, newTemplates);
        }
        break;
      case 'unlink-models':
        if (isKnownModelType)
          currentBuilderContext.modelPaths[type] = currentBuilderContext.modelPaths[type].filter((modelPath) => !modelPath.includes(filePath));
        else
          logger.warn(chalk.dim(`File ${filePath} not in one of the model type subfolders, skipping processing this file...`));
        break;
      case 'unlink-processors':
        delete currentBuilderContext.scripts[fileName];
        break;
      case 'unlink-schemas':
        delete currentBuilderContext.schemaPaths[fileName];
        break;
      case 'unlink-templates':
        if (filePath.includes('partials')) {
          logger.debug(chalk.dim(`Reregistering partials...`));
          await registerPartials();
        } else {
          delete currentBuilderContext.templates[fileName];
        }
        break;
      default:
        logger.info(chalk.dim(`No action needed for this change, running build step...`));
    }  
  }
  try {
    await build(currentBuilderContext, false);
  } catch(e) {
    logger.info(chalk.dim(`Build step errored, the last change likely caused this problem...`));
  }
}

export async function watchProject() {
  let updateDebounce;

  logger.info(chalk.dim(`👀 Watching current directory ${currentFolder}.`));
  const watcher = chokidar.watch([
    './models/**/*.yaml',
    './schemas/*.json',
    './processors/*.js',
    './templates/**/*.hbs',
  ], { ignoreInitial: true }).on('all', (evt, filePath) => {
    if (updateDebounce) clearTimeout(updateDebounce);
    updateDebounce = setTimeout(buildProject, 500, evt, filePath);
  });

  try {
    logger.info(chalk.dim('ℹ️ Running initial project build...'));
    currentBuilderContext = await build(undefined, false);
  } catch(err) {
    logger.info(chalk.dim(`Initial build errored, continuing to watch project...`));
  }


  process.stdin.resume();

  process.on('SIGINT', async () => {
    logger.info('\n');
    logger.info('ℹ️ Terminating trellis watch...');
    await rm('./temp', { recursive: true, force: true });
    await watcher.close();
    process.exit();
  });
}
