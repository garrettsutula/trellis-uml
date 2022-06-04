#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import build from './build';
import { initializeProject } from './init';
import { watchProject } from './watch';

const { argv } = yargs(hideBin(process.argv))
  .usage('⚠️ Usage: $0 [init|generate|serve]')
  .demandCommand(1);

const { _: [command, type] = [] } = argv;

let invokedCommand;

console.log(chalk.bold(`⚙️ Running command 'trellis ${command}'`));
console.time(chalk.dim('⏱ Total duration'));
switch (command) {
  case 'init':
    invokedCommand = initializeProject(type);
    break;
  case 'build':
    invokedCommand = build();
    break;
  case 'watch':
    invokedCommand = watchProject();
    break;
  default:
    console.error(chalk.red(`⛔️ Unrecognized command: ${command}.`));
    throw new Error();
}

invokedCommand
  .then(() => {
    if (command !== 'watch') {
      console.log(chalk.bold.underline.green(`✅ 'trellis ${command}' ran successfully!`));
      console.timeEnd(chalk.dim('⏱ Total duration'));
      process.exit(0);
    }
  })
  .catch((e) => {
    console.error(chalk.red(`⛔️ Problem running 'trellis ${command}'`));
    console.dir(e);
    process.exit(1);
  });
