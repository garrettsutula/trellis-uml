import * as path from 'path';
import * as chokidar from 'chokidar';

const workingDirectoryPath = process.cwd();

export async function serveProject() {
  // TODO
  // Run a process that auto-generates the diagrams on file save.
  // Consider hosting a webserver & small webapp w/ live reload for previews
  // Consider how to integrate with vscode
  return chokidar.watch(path.join(workingDirectoryPath, './src/**/*.ts'), {
    ignoreInitial: true,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 10,
    },
  }).on('all', (event, filePath) => {
    console.log(event, filePath);
  });
}
