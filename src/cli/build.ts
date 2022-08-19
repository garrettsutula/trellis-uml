import { rm } from 'fs/promises';
import chalk from 'chalk';
import preprocess from './preprocess';
import generate from './generate';
import { BuilderContext, firstRunInit, rmTempFiles } from '../project';

import logger from '../common/logger';
let builderContext;

export default async function build(updatedBuilderContext?: BuilderContext, singleRun = true): Promise<BuilderContext> {
  try {
    let totalModelCount = 0;
    logger.time(chalk.dim('⏱ Project build'));

    // If context was updated (e.g. from watch trigger), replace instantiated context with one passed in by caller.
    if (updatedBuilderContext) builderContext = updatedBuilderContext;

    // If needed, perform initial full load of project files.
    if (!builderContext)
      builderContext = await firstRunInit();

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
    logger.info(chalk.green(`✅ Build SUCCESSFUL! ${totalModelCount} models processed`))
  } catch (err) {
    logger.error('⛔️ Build FAILED due to one or more errors in the project.', err);
    throw err;
  } finally {
    logger.timeEnd(chalk.dim('⏱ Project build'));
    if (singleRun) await rm('./temp', { recursive: true, force: true });
  }
  
  return builderContext;
}