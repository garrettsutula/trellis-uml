import * as path from 'path';
import chalk from 'chalk';
import * as chokidar from 'chokidar';
import build, { BuilderContext } from './build';
import { getScripts } from '../processors';
import { getTemplates } from '../templates';

const filePathRegex = /^(\w*)\/(?:([\w\s-]*)\/)?([\w\s-]*)\.\w*$/;

// TODO: watch each folder type and trigger more efficient build process

let currentBuilderContext: BuilderContext;

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(evt, filePath) {
  const [, fileType, type, fileName] = filePath.match(filePathRegex);
  console.log(chalk.dim(`👀 ${evt === 'unlink' ? 'DELETE': evt.toUpperCase()} detected on: ${filePath}`));
  switch(`${evt}-${fileType}`) {
    case 'add-models':
      currentBuilderContext.modelPaths[type].push(filePath);
      break;
    case 'add-preprocessors':
    case 'change-preprocessors':
      const newScripts = await getScripts([filePath]);
      currentBuilderContext.scripts = Object.assign(currentBuilderContext.scripts, newScripts);
      break;
    case 'add-schemas':
      currentBuilderContext.schemaPaths[fileName] = filePath;
      break;
    case 'add-templates':
    case 'change-templates':
      const newTemplates = await getTemplates('1', [ filePath ]);
      currentBuilderContext.templates = Object.assign(currentBuilderContext.templates, newTemplates);
      break;
    case 'unlink-models':
      currentBuilderContext.modelPaths[type] = currentBuilderContext.modelPaths[type].filter((modelPath) => !modelPath.includes(filePath));
      break;
    case 'unlink-preprocessors':
      delete currentBuilderContext.scripts[fileName];
      break;
    case 'unlink-schemas':
      delete currentBuilderContext.schemaPaths[fileName];
      break;
    case 'unlink-templates':
      delete currentBuilderContext.templates[fileName];
      break;
    default:
      console.info(chalk.dim(`No action needed for this change, running build step...`))
  }
  await build(currentBuilderContext);
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

  console.log(chalk.dim('ℹ️ Running initial project build...'));
  currentBuilderContext = await build();

  process.stdin.resume();

  process.on('SIGINT', async () => {
    console.log('\n', 'ℹ️ Terminating trellis watch...');
    await watcher.close();
    process.exit();
  });
}
