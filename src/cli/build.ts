import { rm } from 'fs/promises';
import chalk from 'chalk';
import preprocess from './preprocess';
import generate from './generate';
import { BuilderContext, firstRunInit } from '../project';

import logger from '../common/logger';

export default async function build(builderContext?: BuilderContext, singleRun = true): Promise<BuilderContext> {
  try {
    let totalModelCount = 0;
    logger.time(chalk.dim('⏱ Project build'));

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
  
        if (modelPaths.length) {
          // TODO: schema check prior to processing
          // const typeSchema = JSON.parse((await readFile(jsonSchemaPath)).toString());
          const preprocessedFilePaths = await Promise.all(modelPaths.map((filePath) => preprocess(filePath, preprocessFn)));
          // Generate output step.
           if (template) return Promise.all(preprocessedFilePaths.map((filePath) => generate(filePath, template, postprocessFn)));
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