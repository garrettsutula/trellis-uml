import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import postProcess from './postprocess';
import logger from '../common/logger';
import { getCircularReplacer } from '../common/json';

const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function processAndSave(processedModel, modelPath, templateObj) {
  const { modelType, fileType, fileName, template } = templateObj;
  const modelFileName = path.basename(modelPath, '.yaml');
  const outputPath = `./output/${modelType}/${modelFileName}/${fileName}.${fileType}`;
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
}

export default async (processedModel, modelPath, templates) => {
  return Promise.all(templates.map((template) => processAndSave(processedModel, modelPath, template)));
};
