import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import postProcess from './postprocess';
import logger from '../common/logger';
import { getCircularReplacer } from '../common/json';

const $RefParser = require('@apidevtools/json-schema-ref-parser');

export default async (processedModel, modelPath, template) => {
  const outputPath = path
  .normalize(modelPath)
  .replace(`temp${path.sep}models${path.sep}`, `output${path.sep}`)
  .replace('.yaml', '.puml');
  let output;
  try {
    output = template(processedModel);
  } catch (err) {
    logger.error(`⛔️ Error generating "${processedModel.id}" output!
    Template: ${JSON.stringify(template, getCircularReplacer())}`);
    throw err;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  return writeFile(outputPath, output);
};
