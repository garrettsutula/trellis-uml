import * as path from 'path';
import { mkdir, copyFile, writeFile } from 'fs/promises';
import logger from '../common/logger';

const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function parseSchema(filePath): Promise<string> {
  let schema;
  try {
    schema = await $RefParser.parse(filePath);
  } catch(err) {
    logger.error(`⛔️ Error parsing model: ${filePath}`, err);
    throw err;
  }
  return schema;
}

export default async function preprocessSchema(schemaFilePath: string, preprocessingFn = model => model): Promise<string> {
  let schema = await parseSchema(schemaFilePath);
  try {
    schema = await preprocessingFn(schema);
  } catch (err) {
    logger.error(`⛔️ Error pre-processing model: ${path.basename(schemaFilePath)}`, err);
    throw err;
  }
  const outputPath = path.join('./temp', schemaFilePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, YAML.stringify(schema));
  return outputPath;
}
