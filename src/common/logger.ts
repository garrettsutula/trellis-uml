import chalk from 'chalk';
import { getCircularReplacer } from './json';

export default {
  info: (message) => {
    console.log(message);
  },
  verbose: (message) => {
    if (global.verbose_level) 
      console.log(message);
  },
  debug: (message, err?) => {
    if (global.verbose_level) {
      console.error(chalk.red(message));
      if (err) console.error(chalk.red((`⛔️ ${err.stack || err.message || JSON.stringify(err, getCircularReplacer())}`).replaceAll('\n', '\n⛔️ ')));  
    }
  },
  warn: (message) => {
    console.warn(message);
  },
  error: (message, err?) => {
    console.error(chalk.red(message));

    if (err) {
      let errDetailStr = (`⛔️ ${err.stack || err.message || JSON.stringify(err, getCircularReplacer())}`);
      const lineCount = (errDetailStr.match(/\n/g) || []).length;
      if (global.verbose_level || lineCount < 2) {
        errDetailStr = errDetailStr.replaceAll('\n', '\n⛔️ ');
      } else {
        errDetailStr = errDetailStr.split('\n')[0] + '\n⛔️    ... view full error using -v to enable verbose logs ...'
      }
      console.error(chalk.red((errDetailStr)));
    }
  },
  time: (message) => {
    if (global.verbose_level)
      console.time(chalk.dim(message));
  },
  timeEnd: (message) => {
    if (global.verbose_level)
      console.timeEnd(chalk.dim(message));
  }

}
