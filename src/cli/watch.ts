import * as path from 'path';
import chalk from 'chalk';
import * as chokidar from 'chokidar';
import build, { BuilderContext } from './build';
import { getScripts } from '../processors';
import { getTemplates, registerPartials } from '../templates';

// TODO: watch each folder type and trigger more efficient build process

let currentBuilderContext: BuilderContext;

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(evt, filePath) {
  const splitPath = filePath.split(path.sep);
  const [fileType, type ] = splitPath;
  const fileName = splitPath[splitPath.length - 1].split('.')[0];
  console.log(chalk.dim(`👀 ${evt === 'unlink' ? 'DELETE': evt.toUpperCase()} detected on: ${filePath}`));
  if (currentBuilderContext) {
    const isKnownModelType = Object.keys(currentBuilderContext.modelPaths).includes(type);
    switch(`${evt}-${fileType}`) {
      case 'add-models':
        if (isKnownModelType)
          currentBuilderContext.modelPaths[type].push(filePath);
        else
          console.log(chalk.dim(`File ${filePath} not in one of the model type subfolders, skipping processing this file...`));
        break;
      case 'add-preprocessors':
        const newScripts = await getScripts([filePath]);
        currentBuilderContext.scripts = Object.assign(currentBuilderContext.scripts, newScripts);
        break;
      case 'change-preprocessors':
        console.log(chalk.dim(`Processor script can't be hot reloaded in this version (feature dev required).`));
        break;
      case 'add-schemas':
        currentBuilderContext.schemaPaths[fileName] = filePath;
        break;
      case 'add-templates':
      case 'change-templates':
        if (filePath.includes('partials')) {
          console.log(chalk.dim(`Reregistering partials...`));
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
          console.log(chalk.dim(`File ${filePath} not in one of the model type subfolders, skipping processing this file...`));
        break;
      case 'unlink-preprocessors':
        delete currentBuilderContext.scripts[fileName];
        break;
      case 'unlink-schemas':
        delete currentBuilderContext.schemaPaths[fileName];
        break;
      case 'unlink-templates':
        if (filePath.includes('partials')) {
          console.log(chalk.dim(`Reregistering partials...`));
          await registerPartials();
        } else {
          delete currentBuilderContext.templates[fileName];
        }
        break;
      default:
        console.info(chalk.dim(`No action needed for this change, running build step...`));
    }  
  }
  try {
    await build(currentBuilderContext, false);
  } catch(e) {
    console.info(chalk.dim(`Build step errored, the last change likely caused this problem...`));
  }
}

export async function watchProject() {
  let updateDebounce;

  console.log(chalk.dim(`👀 Watching current directory ${currentFolder}.`));
  const watcher = chokidar.watch([
    './models/**/*.yaml',
    './schemas/*.json',
    './preprocessors/*.js',
    './templates/**/*.hbs',
  ], { ignoreInitial: true }).on('all', (evt, filePath) => {
    if (updateDebounce) clearTimeout(updateDebounce);
    updateDebounce = setTimeout(buildProject, 500, evt, filePath);
  });

  try {
    console.log(chalk.dim('ℹ️ Running initial project build...'));
    currentBuilderContext = await build(undefined, false);
  } catch(err) {
    console.info(chalk.dim(`Initial build errored, continuing to watch project...`));
  }


  process.stdin.resume();

  process.on('SIGINT', async () => {
    console.log('\n', 'ℹ️ Terminating trellis watch...');
    await watcher.close();
    process.exit();
  });
}
