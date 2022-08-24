import { cp, rm } from 'fs/promises';
import chalk from 'chalk';

import { getTemplates, registerHelpers, registerPartials } from '../templates';
import { getModelPaths } from '../models';
import { getSchemaPaths } from '../schemas';
import { getScripts } from '../processors';
import logger from '../common/logger';

export type BuilderContext = {
  modelPaths: { [key: string]: string[]},
  schemaPaths: { [key: string]: string },
  templates: { [key: string]: Handlebars.Template},
  scripts: { [key: string]: any },
}

export async function firstRunInit(): Promise<BuilderContext> {
  try {
    logger.time(chalk.dim('⏱ Initial project load'));
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
  } catch (err) {
    logger.error(`⛔️ Problem initializing project`);
    await rmTempFiles();
    throw err;
  } finally {
    logger.timeEnd(chalk.dim('⏱ Initial project load'));
  }
}

export async function rmTempFiles() {
  await rm('./temp', { recursive: true, force: true });
}