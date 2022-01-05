#!/usr/bin/env node
import * as Commands from './cli';

export * from './syntax';

const { argv } = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 [init|generate|serve]')
  .demandCommand(1);

const { _: [command, type, name] = [] } = argv;

let invokedCommand;

console.log(`Running command 'trellis ${command}'`);
console.time(`Ran 'trellis ${command}' in`);
switch (command) {
  case 'init':
    invokedCommand = Commands.initializeProject();
    break;
  case 'build':

    invokedCommand = Commands.buildProject();
    break;
  case 'generate':
    invokedCommand = Commands.generateDiagramScaffold(type, name);
    break;
  case 'serve':
    invokedCommand = Commands.serveProject();
    break;
  default:
    console.error(`Unrecognized command: ${command}.`);
    throw new Error();
}

invokedCommand.then(() => {
  console.timeEnd(`Ran 'trellis ${command}' in`);
  process.exit(0);
})
  .catch((e) => {
    console.error(`Problem running 'trellis ${command}'`);
    console.dir(e);
    process.exit(1);
  });
