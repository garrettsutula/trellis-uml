# Trellis
Trellis is a framework & cli tool for making UML diagrams (and other types!) with [PlantUML](https://plantuml.com/). 

This project was made with main goals of: 
- establish good separation of concerns between Modeling & generating Output Artifacts
- using popular tools (json schema, handlebars), minimize framework code.
- modular approach, optionally use pre-defined templates for popular metamodels (e.g. UML, C4, etc.)

## Getting Started
To get started using this project locally, follow these instructions:

1. Make sure you have Node 16 LTS or higher installed.
2. Install this package globally with the command: `npm install -g trellisuml`
3. `cd` into your preferred working directory run the command `trellis init` to initialize a new project folder.
   1. (Optional) Provide a project type, one of: `uml, c4`. Default: `uml`
4. Create models in the sub-folders of the `Models` directory.
5. Run the command `trellis build` to create Output Artifacts based on your models (saved to the `output` directory).

> Note: you should commit both the models & the output artifacts to source control so that you can track both changes to the logical representations & output, catch possible mistakes unintentionally impact output.

## CLI Reference
`trellis init` - initializes project folder structure, package.json and installs latest available dependencies.

`trellis build` - builds the trellis project in the current directory.

`trellis serve` - watches and automatically builds when changes to the trellis project in the current directory are detected.

### Project Structure

```
.
├── .vscode/
│   └── settings.json - json schema config added based on init project template.
├── models/
│   └── ... Subfolder for each schema/template type
├── preprocessors/
│   └── ... .js file that exports a default with signature: function (schema: object): object, optional for transforming models prior to template step.
├── schemas/
│   └── ... json schema files that enforce structure on model files
├── templates/
│   └── ... handlebars templates that are used to generate output artifacts based on pre-processed models
└── package.json
```

### Project Types

#### C4

#### Data Modeling

### UML

## Work in Progress/To-do List
- TODO: full cross-compatibility of json/yaml file types
- Add project types
  - UML
  - C4
  - Database
- Start a hybrid markup/ui editor project.
- Start a backend project for tenant-based project storage and management