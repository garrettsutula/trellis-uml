#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import build from './build';
import { initializeProject } from './init';
import { watchProject } from './watch';

const { argv } = yargs(hideBin(process.argv))
  .usage('⚠️\tUsage: $0 [init|generate|serve]')
  .demandCommand(1);

const { _: [command, type] = [] } = argv;

let invokedCommand;

console.log(chalk.bold(`⚙️\tRunning command 'trellis ${command}'`));
console.time(chalk.dim('⏱\tTotal duration'));
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
    console.error(chalk.red(`⛔️\tUnrecognized command: ${command}.`));
    throw new Error();
}

invokedCommand
  .then(() => {
    if (command !== 'watch') {
      console.log(chalk.bold.underline.green(`✅\t'trellis ${command}' ran successfully!`));
      console.timeEnd(chalk.dim('⏱\tTotal duration'));
      process.exit(0);
    }
  })
  .catch((e) => {
    console.error(chalk.red(`⛔️\tProblem running 'trellis ${command}'`));
    console.dir(e);
    process.exit(1);
  });

  // TODO: add index.ts in root that exports utils like nameToId