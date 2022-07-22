import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import postProcess from './postprocess';

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
  } catch (e) {
    throw new Error(`
    Error generating ${path.basename(schemaFilePath)} output!
    Template: ${JSON.stringify(template)}
    Error: ${JSON.stringify(e)}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  return writeFile(outputPath, output);
};
