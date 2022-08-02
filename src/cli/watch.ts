import * as path from 'path';
import chalk from 'chalk';
import * as chokidar from 'chokidar';
import build from './build';

// TODO: watch each folder type and trigger more efficient build process

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

async function buildProject(filePath) {
  console.log(chalk.dim(`👀\tChanges detected on: ${filePath}`));
  await build();
}

export async function watchProject() {
  let updateDebounce;

  console.log(chalk.dim(`👀\tWatching current directory ${currentFolder}.`));
  const watcher = chokidar.watch([
    './models/**/*.yaml',
    './schemas/*.json',
    './preprocessors/*.js',
    './templates/**/*.hbs',
  ], { ignoreInitial: true }).on('all', (evt, filePath) => {
    if (updateDebounce) clearTimeout(updateDebounce);
    updateDebounce = setTimeout(buildProject, 500, filePath);
  });

  console.log(chalk.dim('ℹ️\tRunning initial project build...'));
  await build();

  process.stdin.resume();

  process.on('SIGINT', async () => {
    console.log('\n', 'ℹ️\tTerminating trellis watch...');
    await watcher.close();
    process.exit();
  });
}
