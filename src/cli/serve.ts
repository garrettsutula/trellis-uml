import * as path from 'path';
import { exec } from 'child_process';
import chalk from 'chalk';

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

function execAsync(command) {
  return new Promise((resolve, reject) => {
    const runningCommand = exec(command, ((err, stdout, stderr) => {
      if (err || stderr) reject(err || stderr);
      resolve(stdout);
    }));
    runningCommand.stdout.pipe(process.stdout);
  });
}

export async function serveProject() {
  // TODO
  // Run a process that auto-generates the diagrams on file save.
  // Consider hosting a webserver & small webapp w/ live reload for previews
  // Consider how to integrate with vscode
  console.log(chalk.dim(`Running 'npm run dev' on current directory ${currentFolder}.`));
  try {
    await execAsync('npm run dev');
  } catch (e) {
    throw new Error('Failed to execute project\'s dev script. Is it missing?');
  }
}
