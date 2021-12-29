# TrellisUML
> A **prescriptive** framework for making UML diagrams with [PlantUML](https://plantuml.com/) and CLI in the style of [angular-cli](https://github.com/angular/angular-cli) for project scaffolding & author productivity.

## Why TrellisUML?
(WIP)
- Big productivity gains by using a popular, actively-developed high-level language/framework and the supporting toolset (IDE features, etc.).
- Markup, although better than graphical visualizations, doesn't enforce consistency or alignment to standards for UML diagrams.
- Often systems & integrations are vast and complex. Trying to express these at different levels of detail becomes very costly using **any** diagramming tool.

## Getting Started
To get started using this project locally, follow these instructions:

1. Make sure you have Node 12.14 or higher installed, ideally latest LTS.
2. Install this package globally with the command: `npm install -g trellisuml`
3. `cd` into your preferred working directory run the command `trellis init` to initialize a new project folder.
4. Use `trellis generate system|service|solution|domain name` to create diagram scaffolds.
5. Review the available exports from the `trellisuml` module & reference examples on how to use them further below.

## CLI Reference
`trellis init` - initializes project folder structure, package.json and installs latest available dependencies.

`trellis generate system|service|solution|domain name` - **(WIP)** - creates a diagram scaffold file in `./src/...` according to the arguments passed.

`trellis build` - **(WIP)** - Iterates over an instance of `DiagramRoot`, the export of `./src/app.ts`, to  render all diagram TypeScript files into PlantUML diagrams in the matching output directory, `./diagrams`.

`trellis serve` - **(TODO)** - runs a process that will auto-generate diagrams automatically on-save, similar to a hot-reload working with a modern SPA or node application.

### Project Structure
See [Diagram Types](#diagram-types) belwo for more information & examples.
```
.
├── src
├── app.ts - diagram root module, exports all diagrams defined in subfolders' index.ts
├──── system
│     ├── appointments.ts
│     ├── index.ts - exports individual systems to provide imports for other diagram files & the diagram root
│     └── ...
├──── service
│     ├── appointments-microservice.ts
│     ├── index.ts - exports individual systems to provide imports for other diagram files & the diagram root
│     └── ...
├──── solution
│     ├── appointments-solution.ts
│     ├── index.ts - exports individual systems to provide imports for other diagram files & the diagram root
│     └── ...
├──── domain
│     ├── my-organization.ts
│     ├── index.ts - exports individual systems to provide imports for other diagram files & the diagram root
│     └── ...
├── diagrams - output folder for diagram rendering, sub-folder structure matches ./src
├──── system
│     ├── appointments.puml
│     ├── index.ts - exports individual systems to provide imports for other diagram files & the diagram root
│     └── ...
├──── ...
├──── ... configuration files for dependencies
├──── ...
└── package.json
```

### Diagram Types

#### System
Each system diagram exports a default that instantiates one `System` and zero or more `Component` and `ComponentRelationship` classes that represent all the different Network, Deployment, and Logical components in the system. 

From these definitions, the following digrams are generated:

- System Diagram - Highest-level representation of the system, typically included and used in high level enterprise architecture diagrams.
- Network Diagram - Overview of execution environments (components represented by `node` in diagrams, e.g. `Domain`, `Device`, and `ExecutionEnvironment`) and the network connections established between them.
- Component Diagram - Logical component diagram of the system and its dependencies.
- Deployment Diagram - Demonstrates how components are deployed into their execution environments with the more detailed representation of connections & dependencies from the Component Diagram.

##### Example
``` TypeScript
import { System, UI, Service, Database, Device, ConnectsTo } from "trellisuml";
// These would typically be defined in a "domain" diagram & imported from that diagram instead of defined here.
// because they are likely re-used by other components in other systems/solutions
const clientDevice = new Device("Mobile App");
const appServer = new Device("Application Server");
const dbServer = new Device("Database Server");
 
const name = "Appointments";
// parentComponents are defined here to place the component in the broader context of the systems & infrastructure.
const app = new UI(`${name} App`, { parentComponent: clientDevice }); 
const service = new Service(`${name} Service`, { parentComponent: appServer });
const db = new Database(`${name} Database`, { parentComponent: dbServer });

export default new System({
    name,
    components: {         // Only the highest level components in the system should be included here.
        clientDevice,     // Rarely, a component without a parentComponent may be defined in a system diagram.
        appServer,        // If so, add it here (but it should probably be in the domain diagram module).
        dbServer,
    },
    relationships: {  // Defined as needed for every connection between systems. De-duplicated when rendered as puml.
        appToService: new ConnectsTo(app, service),
        serviceToDb: new ConnectsTo(service, db),
        clientToServer: new ConnectsTo(clientDevice, appServer, "Ports: 443\\nProtcol:TCP"),
        serverToDb: new ConnectsTo(appServer, dbServer, "Ports: 1443\\nProtcol:TCP")
    }
})
```
#### Service
WIP: implement this, write docs.
#### Solution
WIP: implement this, write docs.