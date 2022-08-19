#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

import build from './build';
import { initializeProject } from './init';
import { watchProject } from './watch';
import logger from '../common/logger';

const { argv } = yargs(hideBin(process.argv))
  .usage('⚠️ Usage: $0 [init|build|watch]')
  .alias('v', 'verbose')
  .demandCommand(1);

const { _: [command, type] = [] } = argv;
global.verbose_level = argv.verbose;

let invokedCommand;

logger.info(chalk.bold(`⚙️ Running command 'trellis ${command}'`));
logger.time(chalk.dim('⏱ Total'));
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
    logger.error(message, err);
    throw err;
}

invokedCommand
  .then(() => {
    if (command !== 'watch') {
      logger.info(chalk.bold.underline.green(`✅ 'trellis ${command}' ran successfully!`));
      logger.timeEnd(chalk.dim('⏱ Total'));
      process.exit(0);
    }
  })
  .catch((e) => {
    logger.error(chalk.red(`⛔️ Problem running 'trellis ${command}', see error logs above for more information.`));
    logger.timeEnd(chalk.dim('⏱ Total'));
    process.exit(1);
  });

