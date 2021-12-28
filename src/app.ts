import { System } from "./models/system";
import { Domain, Device, UI, Service, ExecutionEnvironment, Database, API } from "./models/component";
import { ConnectsTo, Provides, Requires, Uses } from "./models/component-relationship";
import { generateSystemDiagrams } from "./common/generate";

// Outside Network
const house = new Domain("My House");
const myMobile = new Device("My Device", { executionEnvironment: house });
const myMobileOs = new ExecutionEnvironment("My MobileOS", { executionEnvironment: myMobile });
const myApp = new UI("My Application", { executionEnvironment: myMobileOs });

// Internal Network
const datacenter = new Domain("Datacenter");
// API Gateway
const apiGateway = new Device("API Server", { executionEnvironment: datacenter});
const apiContainer = new ExecutionEnvironment("API Container", {executionEnvironment: apiGateway });
const corpService = new API("Corporate", { executionEnvironment: apiContainer });
const publicService = new API("Public", {executionEnvironment: apiContainer});
// App Server
const appServer = new Device("App Server", { executionEnvironment: datacenter });
const appContainer = new ExecutionEnvironment("App Container", { executionEnvironment: appServer });
const myService = new Service("My Service", { executionEnvironment: appContainer });
const intService = new API("Internal", { executionEnvironment: appServer });
// Database
const dbServer = new Device("DB Server", { executionEnvironment: datacenter });
const dbms = new ExecutionEnvironment("DBMS", { executionEnvironment: dbServer });
const myDatabase = new Database("My Database", { executionEnvironment: dbms });
const myDatabase2 = new Database("My Database2", {executionEnvironment: dbms });

export const system = new System({
    name: "My System", 
    components: {
        house,
        myMobile,
        myMobileOs,
        myApp,
        datacenter,
        apiGateway,
        apiContainer,
        corpService,
        publicService,
        appServer,
        appContainer,
        myService,
        intService,
        dbServer,
        dbms,
        myDatabase,
        myDatabase2,
    },
    relationships: {
        appToCorp: new Requires(myApp, corpService),
        CorpToInt: new Requires(corpService, intService),
        PubToInt: new Requires(publicService, intService),
        intToService: new Provides(myService, intService),
        serviceToDb: new Uses(myService, myDatabase, "<<CRUD>>"),
        serviceToDb2: new Uses(myService, myDatabase2, "<<CRUD>>"),
        deviceToGateway: new ConnectsTo(myMobileOs, apiGateway, "Ports: 443\\nProtocol:TCP"),
        gatewayToServer: new ConnectsTo(apiGateway, appServer, "Ports: 80\\nProtocol:TCP"),
        serverToDb: new ConnectsTo(appServer, dbServer, "Ports:1433\\nProtocol:TCP"),
    }
});

// Move to a cli command
generateSystemDiagrams(system);