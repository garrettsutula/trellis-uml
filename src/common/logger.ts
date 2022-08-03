import chalk from 'chalk';

export function logError(message, err?) {
  console.error(chalk.red(message));
  if (err) console.error(chalk.red((`⛔️ ${err.stack || err.message || JSON.stringify(err)}`).replaceAll('\n', '\n⛔️ ')));
}