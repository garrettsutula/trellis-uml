import * as Commands from './cli';

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [init|generate|serve]')
    .demandCommand(1)
    .argv;

export { 
    System,
    SystemConfiguration,
    ComponentConfiguration,
    Database,
    Service,
    UI,
    API,
    Domain,
    Device,
    ExecutionEnvironment,
    ComponentType,
    ComponentRelationshipConfiguration,
    Uses,
    Accesses,
    FlowsInto,
    Provides,
    Requires,
    ConnectsTo,
} from "./models"

const { _: [ command ] = []} = argv;

let invokedCommand;

switch(command) {
    case 'init':
        invokedCommand = Commands.initializeProject();
        break;
    case 'generate':
        invokedCommand = Commands.generateProject();
        break;
    case 'serve':
        invokedCommand = Commands.serveProject();
        break;
    default:
        throw new Error(`Unrecognized command: ${command}.`);
}

invokedCommand.then(() => {
    process.exit(0)
})
.catch(() => {
    process.exit(1)
})