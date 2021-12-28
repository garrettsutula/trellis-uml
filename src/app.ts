import { System } from "./models/system";
import { UI, Service, ExecutionEnvironment, Database, Uses } from "./models/component";
import { writeFileSync } from "fs";
import { generateComponentDiagram } from "./plantuml/component-diagram";
import { generateNetworkDiagram } from "./plantuml/network-diagram";

export const myApp = new UI("My Application");
export const myService = new Service("My Service");
export const myDatabase = new Database("My Database");

const myMobileOs = new ExecutionEnvironment("My MobileOS", { childComponents: [ myApp ]});
const myMobile = new ExecutionEnvironment("My Device", { childComponents: [ myMobileOs ]});
const house = new ExecutionEnvironment("My House", { childComponents: [ myMobile ]});

const dbms = new ExecutionEnvironment("DBMS", { childComponents: [ myService, myDatabase ]});
const server = new ExecutionEnvironment("Server", { childComponents: [ dbms ]});
const datacenter = new ExecutionEnvironment("Datacenter", { childComponents: [ server ]});

export const components = [
    house,
    datacenter
]

export const relationships = [
    new Uses(myApp, myService),
    new Uses(myService, myDatabase),
    new Uses(myMobileOs, server),
];

export const system = new System("My System", components, relationships);
const output = generateComponentDiagram(system);
const output2 = generateNetworkDiagram(system);

writeFileSync('output.puml', output);
writeFileSync('output2.puml', output2);