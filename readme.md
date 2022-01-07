# TrellisUML
TrellisUML is a **prescriptive** TypeScript framework & cli tool for making UML diagrams with [PlantUML](https://plantuml.com/). 

This project was made with main goals of: providing a better developer experience, being as human-readable as possible and supporting easy re-use and extension of diagram content as needed to express various integrations & solutions as it is common in real-life systems.

## Work in Progress/To-do List
Roughly in order of priority.

- Add generator support for `lifecycleState` 
  - Change color
  - Change sterotype (e.g. `<<Service>> - Modified`)
- Add semantic exports for setting lifecycle state (e.g. `new(...args: Component[])`)
- Add generator support for notes on components/relationships based on set `description`.
- Add generator support for `entities`.
- Add generator support for `ports`, `applicationProtocols`, and `networkProtocols`.
- Sequence Diagrams - import components from systems and domains, define sequence diagrams
  - Models
    - Participant
    - Sequence (??? SequenceComponent[])
    - SequenceComponent (???)
    - Request
    - Response
  - Generator
  - Syntax
- Use Case Diagrams - import components from systems and domains, define use cases and use case models (rollup)
  - Models
    - Actor
    - Use Case
    - Use Case Model
  - Generator
  - Syntax
- Solution Diagram - import systems & components, add relationships between systems and annotations.
  - Models
  - Generator
  - Syntax
- Roadmap Diagram - import & decorate systems, components, relationships with lifecycle state changes and annotations.
  - Models
    - Phase
    - Option
    - Roadmap
- Hypertext Linking - Link to system, entity, etc.
- Diagram Configuration
  - level of detail?
  - other rendering options?
  - theme?
  - enable/disable annotations?


- **Misc. Backlog**
  - Full feature support for components, connections along with semantic use (i.e. can set `component.color = 'green'` or pipe components through `New(args: Array<Component | Connection>)` to decorate).

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

`trellis build` - runs project's `npm run build` script. If the project was initialized with `trellis init` then the correct script [swc](https://swc.rs/) was added at that time.

`trellis serve` - runs project's `npm run dev` script. If the project was initialized with `trellis init` then the correct script using [chodikar](https://github.com/paulmillr/chokidar) was added at that time.

### Project Structure
See [Diagram Types](#diagram-types) below for more information & examples.
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

- [System Diagram](./readme/System%20Diagram%20Appointments.png) - Highest-level representation of the system, typically included and used in high level enterprise architecture diagrams.
- [Network Diagram](./readme/Network%20Diagram%20Appointments.png) - Overview of execution environments (components represented by `node` in diagrams, e.g. `Domain`, `Device`, and `ExecutionEnvironment`) and the network connections established between them.
- [Component Diagram](./readme/Component%20Diagram%20Appointments.png) - Logical component diagram of the system and its dependencies.
- [Deployment Diagram](./readme/Deployment%20Diagram%20Appointments.png) - Demonstrates how components are deployed into their execution environments with the more detailed representation of connections & dependencies from the Component Diagram.

##### Example
Reference the [Example Trellis Project](https://github.com/garrettsutula/example-trellis-project) for a non-trivial example.

``` TypeScript
import { system, ui, service, database, device, connectsTo } from "trellisuml";
// These would typically be defined in a "domain" diagram & imported from that diagram instead of defined here.
// because they are likely re-used by other components in other systems/solutions
const [ clientDevice, appServer, dbServer ] = device([
    { label: "Mobile App" },
    { label: "Application Server"},
    { label: "Database Server"}
]);
 
const name = "Appointments";
// parentComponents are defined here to place the component in the broader context of the systems & infrastructure.
export const apptApp = ui(`${name} App`, clientDevice); 
export const apptService = service(`${name} Service`, appServer);
export const apptDb = database(`${name} Database`, dbServer);

// Defined as needed for every connection between systems. De-duplicated when rendered as puml.
export const componentRelationships = [
    connectsTo(apptApp, apptService),
    connectsTo(apptService, apptDb),
    connectsTo(clientDevice, appServer, "Ports: 443\\nProtcol:TCP"),
    connectsTo(appServer, dbServer, "Ports: 1443\\nProtcol:TCP")
]

export default system({
    name,
    components: [
        apptApp,
        apptService,
        apptDb,
    ],
    componentRelationships,
});
```
#### Service
WIP: implement this, write docs.
#### Solution
WIP: implement this, write docs.