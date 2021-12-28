import { System } from "./models/system";
import { Component, ComponentType, Uses } from "./models/component";
import { writeFileSync } from "fs";
import { generateComponentDiagram } from "./plantuml/component-diagram";

export const myApp = new Component("My Application", ComponentType.UI);
export const myService = new Component("My Service", ComponentType.Service);
export const myDatabase = new Component("My Database", ComponentType.Database);
export const db2 = new Component("Database 2", ComponentType.Database);
myDatabase.childComponents = [db2];


export const components = [
    myApp,
    myService,
    myDatabase
]

export const relationships = [
    new Uses(myApp, myService),
    new Uses(myService, myDatabase),
];

export const system = new System("My System", components, relationships);
const output = generateComponentDiagram(system);

writeFileSync('output.puml', output);