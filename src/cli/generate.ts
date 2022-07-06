import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';

const $RefParser = require('@apidevtools/json-schema-ref-parser');

export default async (schemaFilePath, template) => {
  const outputPath = path.normalize(schemaFilePath).replace('temp\\models\\', 'output\\').replace('.yaml', '.puml');
  const schema = await $RefParser.dereference(schemaFilePath);
  let output;
  try {
    output = template(schema);
  } catch (e) {
    throw new Error(`
    Error generating ${path.basename(schemaFilePath)} output!
    Template: ${JSON.stringify(template)}
    Error: ${JSON.stringify(e)}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  return writeFile(outputPath, output);
};
