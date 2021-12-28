import { System } from "./models/system";
import { Domain, Device, UI, Service, ExecutionEnvironment, Database, Uses } from "./models/component";
import { generateSystemDiagrams } from "./common/generate";


const house = new Domain("My House");
const myMobile = new Device("My Device", { executionEnvironment: house });
const myMobileOs = new ExecutionEnvironment("My MobileOS", { executionEnvironment: myMobile });

const datacenter = new Domain("Datacenter");
const server = new Device("Server", { executionEnvironment: datacenter });
const dbms = new ExecutionEnvironment("DBMS", { executionEnvironment: server });
// Move to object structure
export const myApp = new UI("My Application", { executionEnvironment: myMobileOs });
export const myService = new Service("My Service", { executionEnvironment: server });
export const myDatabase = new Database("My Database", { executionEnvironment: dbms });



// Change to objects for better named exports
const components = {
    myApp,
    myService,
    myDatabase,
    house,
    myMobile,
    myMobileOs,
    datacenter,
    server,
    dbms,
};

// Change to objects for better named exports
const relationships = {
    appToService: new Uses(myApp, myService),
    serviceToDb: new Uses(myService, myDatabase),
    deviceToServer: new Uses(myMobileOs, server),
};

export const system = new System("My System", components, relationships);

// Move to a cli command
generateSystemDiagrams(system);