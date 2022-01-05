#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { generateDiagramScaffold } from './generate';
import { initializeProject } from './init';
import { serveProject } from './serve';
import { buildProject } from './build';

const { argv } = yargs(hideBin(process.argv))
  .usage('Usage: $0 [init|generate|serve]')
  .demandCommand(1);

const { _: [command, type, name] = [] } = argv;

let invokedCommand;

console.log(`Running command 'trellis ${command}'`);
console.time(`Ran 'trellis ${command}' in`);
switch (command) {
  case 'init':
    invokedCommand = initializeProject();
    break;
  case 'build':

    invokedCommand = buildProject();
    break;
  case 'generate':
    invokedCommand = generateDiagramScaffold(type, name);
    break;
  case 'serve':
    invokedCommand = serveProject();
    break;
  default:
    console.error(`Unrecognized command: ${command}.`);
    throw new Error();
}

invokedCommand
  .then(() => {
    console.timeEnd(`Ran 'trellis ${command}' in`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(`Problem running 'trellis ${command}'`);
    console.dir(e);
    process.exit(1);
  });
