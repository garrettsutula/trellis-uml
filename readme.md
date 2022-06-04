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
├── models - conform to a matching json schema in the 'schemas' directory.
│     └── subfolders for each model type
│          └── *.json/*.yaml
├── preprocessors - (Optional) scripts that enhance models prior to generating Output Artifacts using templates.
│     └── *.js - matching model type
├── schemas - json schema files that validate and structure models
│     └── *.schema.json - matching model type
├── templates - handlebars templates that generate Output Artifacts from templates.
│     ├── partials
│         └── ... *.hbs - partial templates used in parent templates
│     └── *.hbs - matching model type
├── output - Output Artifacts generated with the command 'trellis build' are output here.
└── package.json
```

### Project Types

> TODO: add C4, UML and Database project templates, "default" is a simple system modeling template for now.

## Work in Progress/To-do List
- TODO: full cross-compatibility of json/yaml file types
- Add project types
  - UML
  - C4
  - Database