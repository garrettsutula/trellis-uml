# Trellis
Trellis is a framework & cli tool for making create swagger-spec-like models of Software Systems that can be used to generate artifacts like diagrams, configuration files, and documentation.

This project was made with main goals of: 
- establishing good separation of concerns between Modeling & generating Output Artifacts
- using popular tools (json schema, handlebars), minimize framework code.
- modular approach, optionally use pre-defined templates for popular metamodels (e.g. UML, C4, etc.)

## Getting Started
To get started using this project locally, follow these instructions:

1. Make sure you have Node 16 LTS or higher installed.
3. `cd` into your preferred working directory run the command `npx trellisuml init` to initialize a new project folder.
   1. (Optional) Provide a project type, one of: `uml, c4, data`. Default: `uml`
4. Create models in the sub-folders of the `models` directory.
  > Note: use sub-folders as needed to organize your workspace.
5. Run the command `trellis build` to create Output Artifacts based on your models (saved to the `output` directory).

> ⚠️ Note: you should commit both the models & the output artifacts to source control so that you can track both changes to the models & generated output in order to better understand model changes and to catch possible mistakes that unintentionally impact output.

## How It Works
### Application Architecture
![Application Architecture Diagram](./docs/assets/App%20Architecture.svg)
### Build Sequence
![Build Sequence Diagram](./docs/assets/Sequence%20Diagram.svg)

## CLI Reference
`trellis init` - initializes project folder structure, package.json and installs latest available dependencies.

`trellis build` - builds the trellis project in the current directory.

`trellis watch` - watches and automatically builds when changes to the trellis project in the current directory are detected.

### Project Structure

```
.
├── .vscode/
│   └── settings.json - json schema config added based on init project template.
├── models/
│   └── ... Subfolder for each schema/template type
├── processors/
│   └── ... .js file that exports a default with signature: function (schema: object): object, optional for transforming models prior to template step.
├── schemas/
│   └── ... json schema files that enforce structure on model files
├── templates/
│   └── ... handlebars templates that are used to generate output artifacts based on pre-processed models
└── package.json - provides scripts for dev and ci/cd, used to pin workspace trellis version
```

### Project Types

#### UML
Refer to the UML model type documentation for more information:
- [**System**](./docs/uml//System.md) - models a Software System `Package`
- [**Use Case Model**](./docs/uml/UseCaseModel.md) - models one or more `Use Cases` that support a Business Process.
- [**Project**](./docs/uml//Project.md) - models one or more `Use Cases` that change as part of a software development project and the Solution `Options` supporting that change.

#### C4 (🚧 WIP)
Refer to the C4 model type documentation for more information:
- **Component**
- **Container**
- **System**
- **Solution**