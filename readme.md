# TrellisUML
TrellisUML is a **prescriptive** TypeScript framework & cli tool for making UML diagrams with [PlantUML](https://plantuml.com/). 

This project was made with main goals of: providing a better developer experience, being as human-readable as possible and supporting easy re-use and extension of diagram content as needed to express various integrations & solutions as it is common in real-life systems.

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

From these definitions, the following diagrams are generated:

- [System Diagram](./readme/System%20Diagram%20Appointments.png) - Highest-level representation of the system, typically included and used in high level enterprise architecture diagrams.
- [Network Diagram](./readme/Network%20Diagram%20Appointments.png) - Overview of execution environments (components represented by `node` in diagrams, e.g. `Domain`, `Device`, and `ExecutionEnvironment`) and the network connections established between them.
- [Component Diagram](./readme/Component%20Diagram%20Appointments.png) - Logical component diagram of the system and its dependencies.
- [Deployment Diagram](./readme/Deployment%20Diagram%20Appointments.png) - Demonstrates how components are deployed into their execution environments with the more detailed representation of connections & dependencies from the Component Diagram.

##### Example
Reference the [Example Trellis Project](https://github.com/garrettsutula/example-trellis-project) for a non-trivial example.

``` TypeScript
import {
  system, ui, service, database, device, componentRelationships,
} from 'trellisuml';

const { uses } = componentRelationships;
// These would typically be defined in a "domain" diagram & imported from that diagram instead of defined here.
// because they are likely re-used by other components in other systems/solutions
const [clientDevice, appServer, dbServer] = device([
  { label: 'Mobile App' },
  { label: 'Application Server' },
  { label: 'Database Server' },
]);

const name = 'Appointments';
// parentComponents are defined here to place the component in the broader context of the systems & infrastructure.
export const apptApp = ui(`${name} App`, clientDevice);
export const apptService = service(`${name} Service`, appServer);
export const apptDb = database(`${name} Database`, dbServer);

export default system({
  name,
  components: {
    apptApp,
    apptService,
    apptDb,
  },
  // Defined as needed for every connection between systems. De-duplicated when rendered as puml.
  componentRelationships: [
    uses(apptApp, apptService),
    uses(apptService, apptDb),
    uses(clientDevice, appServer, 'Ports: 443\\nProtocol:TCP'),
    uses(appServer, dbServer, 'Ports: 1443\\nProtocol:TCP'),
  ],
});
```
#### Service
WIP: implement this, write docs.
#### Solution
WIP: implement this, write docs.

## Work in Progress/To-do List

- Namespace component alias generation
- Improve implementation of queue, service interfaces 
  - move to constructor?
  - add this functionality to Topic
- Roadmap syntax
- Use Case Diagram Support
- Sequence Diagram Support
- Solution Diagram Support
- Roadmap Diagram Support
- Markup features:
  - `lifecycleState` support
    - Change color
    - Append state to stereotype
  - Use `description` to generate notes
  - Annotations support (add to component, relationship, system models?)
  - Hypertext Linking - Link to system, entity, etc.
  - Diagram generation configuration?
    - Level of detail/
    - other rendering options?
    - theme?
    - enable/disable annotations?