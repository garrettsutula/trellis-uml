import { rm } from 'fs/promises';
import chalk from 'chalk';
import preprocess from './preprocess';
import generate from './generate';
import { BuilderContext, firstRunInit } from '../project';

import logger from '../common/logger';
import postprocess from './postprocess';

export default async function build(builderContext?: BuilderContext, singleRun = true): Promise<BuilderContext> {
  try {
    let totalModelCount = 0;
    logger.time(chalk.dim('⏱ Project build'));

    // If needed, perform initial full load of project files.
    if (!builderContext)
      builderContext = await firstRunInit();

    const modelTypes = Object.keys(builderContext.modelPaths);

    // Pre-processing step to enhance models with additional $refs prior to de-referencing.
    //
    // If a pre-processing script is not present for the model type, the model is simply
    // passed through and saved to the './temp/...' directory to be used in later build steps.
    logger.time(chalk.dim('⏱ Pre-processing'));
    const allPreprocessedModelPaths = await Promise.all(modelTypes.map(async (type) =>{
      const modelPaths = builderContext.modelPaths[type];
      const { preprocessFn } = builderContext.scripts[type] || {};

      if (modelPaths.length) {
        // TODO: schema check prior to processing
        // const typeSchema = JSON.parse((await readFile(jsonSchemaPath)).toString());
        const preprocessedFilePaths = await Promise.all(modelPaths.map((filePath) => preprocess(filePath, preprocessFn)));
        return preprocessedFilePaths;
      }
      return [];
    }));
    logger.timeEnd(chalk.dim('⏱ Pre-processing'));

    // Enhance models typically by iterating over the contents and setting higher-order collections 
    // of objects to make writing output templates as simple as possible.
    logger.time(chalk.dim('⏱ De-Reference and Post-Processing'));
    const allProcessedModels = await Promise.all(allPreprocessedModelPaths.map(async (modelPaths, i) => {
      const type = modelTypes[i];
      const template = builderContext.templates[type];
      const { postprocessFn } = builderContext.scripts[type] || {};

      if (template) return Promise.all(
        modelPaths
          .map((modelPath) => postprocess(modelPath, postprocessFn))
      );
    }));
    logger.timeEnd(chalk.dim('⏱ De-Reference and Post-Processing'));

    // Apply model template to each model and save the output artifact to the './output/...' folder.
    logger.time(chalk.dim('⏱ Generate output artifacts'));
    await Promise.all(allProcessedModels.map(async (models, typeIndex) => {
      totalModelCount += (models && models.length) || 0;
      const type = modelTypes[typeIndex];
      const tempModelPaths = allPreprocessedModelPaths[typeIndex];
      const templates = builderContext.templates[type];

      if (templates) return Promise.all(
        models
          .map((model, i) => generate(model, tempModelPaths[i], templates))
        );
    }));
    logger.timeEnd(chalk.dim('⏱ Generate output artifacts'));

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