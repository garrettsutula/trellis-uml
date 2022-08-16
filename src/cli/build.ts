import { rm, cp } from 'fs/promises';
import chalk from 'chalk';
import preprocess from './preprocess';
import generate from './generate';
import { getTemplates, registerHelpers, registerPartials } from '../templates';
import { getModelPaths } from '../models';
import { getSchemaPaths } from '../schemas';
import { getScripts } from '../processors';
import { logError } from '../common/logger';
let builderContext;

export type BuilderContext = {
  modelPaths: { [key: string]: string[]},
  schemaPaths: { [key: string]: string },
  templates: { [key: string]: Handlebars.Template},
  scripts: { [key: string]: any },
}

async function firstRunInit(): Promise<BuilderContext> {
  const [
    modelPaths,
    templates,
    schemaPaths,
    scripts
  ] = await Promise.all([
    getModelPaths(),
    getTemplates(),
    getSchemaPaths(),
    getScripts(),
    cp('./models/', './temp/models/', { recursive: true }),
    registerHelpers(),
    registerPartials(),
  ])

  return {
    modelPaths,
    templates,
    schemaPaths,
    scripts,
  }
}

export default async function build(updatedBuilderContext?: BuilderContext, singleRun = true): Promise<BuilderContext> {
  console.time(chalk.dim('⏱ Project build'));
  // Load project files from filesystem.

  // If context was updated (e.g. from watch trigger), replace instantiated context with one passed in by caller.
  if (updatedBuilderContext) builderContext = updatedBuilderContext;

  // If needed, perform initial full load of project files.
  if (!builderContext) {
    try {
      console.time(chalk.dim('⏱ Initial project load'));
      builderContext = await firstRunInit();
    } catch(err) {
      logError(`⛔️ Problem initializing project`);
      console.timeEnd(chalk.dim('⏱ Project build'));
      throw err;
    } finally {
      console.timeEnd(chalk.dim('⏱ Initial project load'));
    }
  }

  let totalModelCount = 0;
  try {
    await Promise.all(
      Object.keys(builderContext.modelPaths).map(async (type) => {
        const modelPaths = builderContext.modelPaths[type];
        const schemaPath = builderContext.schemaPaths[type];
        const template = builderContext.templates[type];
        const {preprocessFn = schema => schema, postprocessFn = schema => schema} = builderContext.scripts[type] || {};
        totalModelCount += modelPaths.length;
  
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
    console.log(chalk.green(`✅ Build SUCCESSFUL! ${totalModelCount} models processed`))
  } catch (err) {
    logError('⛔️ Build FAILED due to one or more errors in the project.', err);
    throw err;
  } finally {
    console.timeEnd(chalk.dim('⏱ Project build'));
  }
  
  // Clean up temporary workspace if single run.
  if (singleRun) await rm('./temp', { recursive: true, force: true });
  return builderContext;
}
