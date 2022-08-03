import chalk from 'chalk';

export function logError(message, err?) {
  console.error(chalk.red(message));
  if (err)console.error(chalk.red((`⛔️ ${err.stack || err.message}`).replaceAll('\n', '\n⛔️ ')));
}