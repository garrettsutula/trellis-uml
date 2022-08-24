import * as path from 'path';
import { rm } from 'fs/promises';
import chalk from 'chalk';
import * as chokidar from 'chokidar';

import  build from './build';
import { getScripts } from '../processors';
import { getTemplates, registerPartials } from '../templates';
import logger from '../common/logger';

import {BuilderContext} from '../project';

let currentBuilderContext: BuilderContext;

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(events, filePaths) {
  if (events.length === 1) {
    const evt = events[0];
    const filePath = filePaths[0];
    const fileName = path.parse(filePath).name;
    const [ projectFileType, firstSubfolder ] = filePath.split(path.sep);
    logger.info(chalk.dim(`👀 ${evt.toUpperCase()} detected on: ${filePath}`));
    logger.verbose(`Change event '${`${evt}-${projectFileType}`}'`)
    if (currentBuilderContext) {
      const isKnownModelType = Object.keys(currentBuilderContext.modelPaths).includes(firstSubfolder);
      switch(`${evt}-${projectFileType}`) {
        case 'addDir-models':
          currentBuilderContext.modelPaths[firstSubfolder] = [];
          break;
        case 'add-models':
          if (isKnownModelType)
            currentBuilderContext.modelPaths[firstSubfolder].push(filePath);
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
        case 'unlinkDir-models':
          if(isKnownModelType)
            delete currentBuilderContext.modelPaths[firstSubfolder];
          break;
        case 'unlink-models':
          if (isKnownModelType)
            currentBuilderContext.modelPaths[firstSubfolder] = currentBuilderContext.modelPaths[firstSubfolder].filter((modelPath) => !modelPath.includes(filePath));
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
          logger.debug(`Change event '${`${evt}-${projectFileType}`}' not handled by watch command.`)
          logger.info(chalk.dim(`No action needed for this change, running build step...`));
      }  
    }  
  } else {
    logger.info(`‼️ ${events.length} changes detected at once, reloading project workspace.`)
    currentBuilderContext = undefined;
  }
  events.length = 0;
  filePaths.length = 0;
  try {
    currentBuilderContext = await build(currentBuilderContext, false);
  } catch(e) {
    logger.info(chalk.dim(`Build step errored, the last change likely caused this problem...`));
  }
}

export async function watchProject() {
  let updateDebounce;
  const events = [];
  const filePaths = [];

  logger.info(chalk.dim(`👀 Watching current directory ${currentFolder}.`));
  const watcher = chokidar.watch([
    './models/**',
    './schemas/**/*.json',
    './processors/*.js',
    './templates/**/*.hbs',
  ], { ignoreInitial: true }).on('all', (evt, filePath) => {
    events.push(evt);
    filePaths.push(filePath);
    if (updateDebounce) clearTimeout(updateDebounce);
    updateDebounce = setTimeout(buildProject, 500, events, filePaths);
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
