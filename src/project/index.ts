import { cp, rm } from 'fs/promises';
import chalk from 'chalk';

import * as Handlebars from 'handlebars';

import { getTemplates, registerPartials } from '../templates';
import { getModelPaths } from '../models';
import { getSchemaPaths } from '../schemas';
import { getScripts } from '../processors';
import logger from '../common/logger';

export type BuilderContext = {
  modelPaths: { [key: string]: string[]},
  tempModelPaths: { [key: string]: string[]},
  schemaPaths: { [key: string]: string },
  templates: { [key: string]: {
    modelType: string,
    fileType: string,
    template: Handlebars.Template,
  }[]},
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
      registerPartials(),
    ])
  
    return {
      modelPaths,
      tempModelPaths: {},
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