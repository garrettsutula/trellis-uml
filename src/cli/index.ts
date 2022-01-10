#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import { generateDiagramScaffold } from './generate';
import { initializeProject } from './init';
import { serveProject } from './serve';
import { buildProject } from './build';
import { escapeString } from '../common/utils';

const { argv } = yargs(hideBin(process.argv))
  .usage('Usage: $0 [init|generate|serve]')
  .demandCommand(1);

const { _: [command, type, name] = [] } = argv;

let invokedCommand;

console.log(chalk.bold(`Running command 'trellis ${command}'`));
console.time(chalk.dim('Total duration'));
switch (command) {
  case 'init':
    invokedCommand = initializeProject();
    break;
  case 'build':
    invokedCommand = buildProject();
    break;
  case 'generate':
    invokedCommand = generateDiagramScaffold(type, escapeString(name));
    break;
  case 'serve':
    invokedCommand = serveProject();
    break;
  default:
    console.error(chalk.red(`Unrecognized command: ${command}.`));
    throw new Error();
}

invokedCommand
  .then(() => {
    console.log(chalk.bold.underline.green(`'trellis ${command}' ran successfully!`));
    console.timeEnd(chalk.dim('Total duration'));
    process.exit(0);
  })
  .catch((e) => {
    console.error(chalk.red(`Problem running 'trellis ${command}'`));
    console.dir(e);
    process.exit(1);
  });
