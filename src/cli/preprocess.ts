import * as path from 'path';
import { mkdir, writeFile, copyFile } from 'fs/promises';
import { logError } from '../common/logger';

const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function preprocessSchema(schemaFilePath: string, preprocessingFn: any): Promise<string> {
  let schema = await $RefParser.parse(schemaFilePath);
  /*
  try {
    const result = validate(schema, typeSchema);
  } catch (e) {
    throw new Error(`Error validating schema:\n${JSON.stringify(e)}`);
  }
  */
  try {
    schema = await preprocessingFn(schema);
  } catch (e) {
    e.message = `Error pre-processing schema: ${path.basename(schemaFilePath)}\n` + e.message;
    throw e
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
    logError(`⛔️ Error pre-processing schema '${filePath}'`);
    throw err;
  }

};
