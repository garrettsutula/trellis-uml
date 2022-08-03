#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import build from './build';
import { initializeProject } from './init';
import { watchProject } from './watch';
import { logError } from '../common/logger';

const { argv } = yargs(hideBin(process.argv))
  .usage('⚠️ Usage: $0 [init|build|watch]')
  .demandCommand(1);

const { _: [command, type] = [] } = argv;

let invokedCommand;

console.log(chalk.bold(`⚙️ Running command 'trellis ${command}'`));
console.time(chalk.dim('⏱ Total'));
switch (command) {
  case 'init':
    invokedCommand = initializeProject(type);
    break;
  case 'build':
    invokedCommand = build(undefined, true);
    break;
  case 'watch':
    invokedCommand = watchProject();
    break;
  default:
    const message = `⛔️ Unrecognized command: ${command}.`;
    const err = new Error(`⛔️ Unrecognized command: ${command}.`);
    logError(message, err);
    throw err;
}

invokedCommand
  .then(() => {
    if (command !== 'watch') {
      console.log(chalk.bold.underline.green(`✅ 'trellis ${command}' ran successfully!`));
      console.timeEnd(chalk.dim('⏱ Total'));
      process.exit(0);
    }
  })
  .catch((e) => {
    console.error(chalk.red(`⛔️ Problem running 'trellis ${command}', see error logs above for more information.`));
    process.exit(1);
  });

  // TODO: add index.ts in root that exports utils like nameToId