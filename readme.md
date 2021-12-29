# TrellisUML
> A **prescriptive** framework for making UML diagrams with [PlantUML](https://plantuml.com/) and CLI in the style of [angular-cli](https://github.com/angular/angular-cli) for project scaffolding & author productivity.

## Why TrellisUML?
(WIP)
- Big productivity gains by using a popular, actively-developed high-level language/framework and the supporting toolset (IDE features, etc.).
- Markup, although better than graphical visualizations, doesn't enforce consistency or alignment to standards for UML diagrams.
- Often systems & integrations are vast and complex. Trying to express these at different levels of detail becomes very costly using **any** diagramming tool.

## Getting Started
To get started locally, follow these instructions:

1. Make sure you have Node 12.14 or higher installed, ideally latest LTS.
2. Install this package globally with the command: `npm install -g trellisuml`
3. In your preferred working directory run the command `trellis init "myProject"` to initialize a new project folder.

> Note: you will get an error & nothing will happen if the project folder exists already, relative to the current working directory.

## Using Trellis (CLI Commands)
`trellis init` will initialize a project folder w/ folder structure and typescript modules that will be used as the basis for creating diagrams based off of instantiations of a few key classes.

`trellis generate system|service|solution|domain name` (WIP) will create a new `.ts` file with a scaffold for the specified diagram type with the specified name.

`trellis build` (WIP) will iterate over the contents of `./src` to attempt to render all `.ts` files into PlantUML diagrams in the matching output directory, `./diagrams`.

`trellis serve` (WIP) will run a process that will auto-generate diagrams automatically on-save, similar to a hot-reload working with a modern SPA or node application.

### Project Structure
See [Diagram Types](#diagram-types) belwo for more information & examples.
```
.
├── src
├──── system
│     ├── appointments.ts
│     └── ...
├──── service
│     ├── appointments-microservice.ts
│     └── ...
├──── solution
│     ├── appointments_solution.ts
│     └── ...
├──── domain
│     ├── my-organization.ts
│     └── ...
├── diagrams - output folder for diagram rendering, sub-folder structure matches ./src
├──── system
│     ├── appointments.puml
│     └── ...
├──── ...
└── package.json
```

### Diagram Types

#### System
Each system diagram exports a default that instantiates one `System` and zero or more `Component` and `ComponentRelationship` classes that represent all the different Network, Deployment, and Logical components in the system. From these definitions, the following digrams are generated:

- System Diagram - Highest-level representation of the system, typically included and used in high level enterprise architecture diagrams.
- Network Diagram - Overview of execution environments (components represented by `node` in diagrams, e.g. `Domain`, `Device`, and `ExecutionEnvironment`) and the network connections established between them.
- Component Diagram - Logical component diagram of the system and its dependencies.
- Deployment Diagram - Demonstrates how components are deployed into their execution environments with the more detailed representation of connections & dependencies from the Component Diagram.

##### Example
``` TypeScript
import { UI, Service, Database, ConnectsTo  } from "trellisuml";
import { clientDevice, appServer, dbServer } from "../Domain/domain.ts"; // Import & use Device(name: string) to easily re-create these dependencies.
 
const name = "Appointments";
const app = new UI(`${name} App`, { parentComponent: clientDevice });
const service = new Service(`${name} Service`, { parentComponent: dbServer });
const db = new Database(`${name} Database`, { parentComponent: dbServer });

export default new System({
    name,
    components: {
        app,
        service,
        db,
    },
    relationships: {
        appToService: new ConnectsTo(app, service),
        serviceToDb: new ConnectsTo(service, db),
        clientToServer: new ConnectsTo(clientDevice, appServer, "Ports: 443\\nProtcol:TCP"),
        clientToServer: new ConnectsTo(appServer, dbServer, "Ports: 1443\\nProtcol:TCP")

    }
})
```
#### Service
WIP: implement this, write docs.
#### Solution
WIP: implement this, write docs.