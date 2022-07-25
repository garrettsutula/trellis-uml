import * as path from 'path';
import chalk from 'chalk';
import * as chokidar from 'chokidar';
import build from './build';

// TODO: gracefully handle SIGTERM
// TODO: watch each folder type and trigger more efficient build process

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(filePath) {
  console.log(chalk.dim(`Changes detected on: ${filePath}`));
  await build();
}

export async function watchProject() {
  let updateDebounce;

  console.log(chalk.dim(`Watching current directory ${currentFolder}.`));
  chokidar.watch([
    './models/**/*.yaml',
    './schemas/*.json',
    './preprocessors/*.js',
    './templates/**/*.hbs',
  ], { ignoreInitial: true }).on('all', (evt, filePath) => {
    if (updateDebounce) clearTimeout(updateDebounce);
    updateDebounce = setTimeout(buildProject, 500, filePath);
  });

  console.log(chalk.dim('Running initial project build...'));
  await build();

  process.stdin.resume();

  process.on('SIGINT', () => {
    console.log('Received SIGINT. Press Control-D to exit.');
  });

  // Using a single function to handle multiple signals
  function handle(signal) {
    console.log(`Received ${signal}`);
  }

  process.on('SIGINT', handle);
  process.on('SIGTERM', handle);
}
