import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import postProcess from './postprocess';
import logger from '../common/logger';

const $RefParser = require('@apidevtools/json-schema-ref-parser');

export default async (schemaFilePath, template, postprocessFn) => {
  const outputPath = path
    .normalize(schemaFilePath)
    .replace(`temp${path.sep}models${path.sep}`, `output${path.sep}`)
    .replace('.yaml', '.puml');
  const schema = await $RefParser.dereference(schemaFilePath);
  let output;
  try {
    output = template(postProcess(schema, postprocessFn));
  } catch (err) {
    logger.error(`⛔️ Error generating ${path.basename(schemaFilePath)} output!
    Template: ${JSON.stringify(template)}`);
    throw err;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  return writeFile(outputPath, output);
};
