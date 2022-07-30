import { rm, cp } from 'fs/promises';
import * as Handlebars from 'handlebars';
import chalk from 'chalk';

import preprocess from './preprocess';
import generate from './generate';
import { getTemplates, registerHelpers, registerPartials } from '../templates';
import { getModelPaths } from '../models';
import { getSchemaPaths } from '../schemas';
import { getScripts } from '../processors';
let builderContext;

type GenericObject = {
  [key: string]: string | number | boolean | GenericObject | GenericObject[]
};

export type BuilderContext = {
  modelPaths: { [key: string]: GenericObject[]},
  schemaPaths: { [key: string]: string },
  templates: { [key: string]: Handlebars.Template},
  scripts: { [key: string]: any },
}

async function init(): Promise<BuilderContext> {
  const [
    modelPaths,
    templates,
    schemaPaths,
    scripts
  ] = await Promise.all([
    getModelPaths(),
    getTemplates(Handlebars),
    getSchemaPaths(),
    getScripts(),
    cp('./models/', './temp/models/', { recursive: true }),
    registerHelpers(Handlebars),
    registerPartials(Handlebars),
  ])

  return {
    modelPaths,
    templates,
    schemaPaths,
    scripts,
  }
}

export default async function build(updatedBuilderContext?: BuilderContext): Promise<void> {
  console.time(chalk.dim('Build duration'));
  // Load project files from filesystem.

  // If needed, perform initial full load of project files.
  if (!builderContext) {
    console.time(chalk.dim('Initial load duration'));
    builderContext = await init();
    console.timeEnd(chalk.dim('Initial load duration'));
  }
  // If context was updated (e.g. from watch trigger), replace instantiated context with one passed in by caller.
  if (updatedBuilderContext) builderContext = updatedBuilderContext;

  await Promise.all(
    Object.keys(builderContext.modelPaths).map(async (type) => {
      const modelPaths = builderContext.modelPaths[type];
      const schemaPath = builderContext.schemaPaths[type];
      const template = builderContext.templates[type];
      const {preprocessFn = schema => schema, postprocessFn = schema => schema} = builderContext.scripts[type] || {};

      if (modelPaths.length && template && schemaPath) {
        // TODO: schema check prior to processing
        // const typeSchema = JSON.parse((await readFile(jsonSchemaPath)).toString());
        const preprocessedFilePaths = await Promise.all(modelPaths.map((filePath) => preprocess(filePath, preprocessFn)));
        // Generate output step.
        return Promise.all(preprocessedFilePaths.map((filePath) => generate(filePath, template, postprocessFn)));
      }
      return [];
    }),
  );
  console.timeEnd(chalk.dim('Build duration'));
  // Clean up temporary workspace.
  await rm('./temp', { recursive: true, force: true });
}
