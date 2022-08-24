import * as path from 'path';
import { mkdir, writeFile, copyFile } from 'fs/promises';
import logger from '../common/logger';

const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function preprocessSchema(schemaFilePath: string, preprocessingFn: any): Promise<string> {
  let schema;
  try {
    schema = await $RefParser.parse(schemaFilePath);
  } catch(err) {
    logger.error(`Error parsing model: ${schemaFilePath}`, err);
    throw err;
  }
  try {
    schema = await preprocessingFn(schema);
  } catch (err) {
    logger.error(`Error pre-processing schema: ${path.basename(schemaFilePath)}`, err);
    throw err;
  }
  const outputPath = path.join('./temp', schemaFilePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, YAML.stringify(schema));
  return outputPath;
}

async function justCopySchema(filePath): Promise<string> {
  const outputPath = path.join('./temp', filePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await copyFile(filePath, outputPath);
  return outputPath;
}

export default async (filePath, preprocessFn): Promise<string> => {
  try {
    if (preprocessFn) {
      const processedSchema = await preprocessSchema(filePath, preprocessFn);
      return processedSchema;
    }
    return justCopySchema(filePath);
  } catch (err) {
    logger.error(`⛔️ Error pre-processing schema '${filePath}'`);
    throw err;
  }
};
