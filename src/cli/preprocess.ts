import * as path from 'path';
import { mkdir, writeFile, copyFile } from 'fs/promises';
import logger from '../common/logger';

const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function preprocessSchema(schemaFilePath: string, preprocessingFn: any): Promise<string> {
  let schema;
  try {
    schema = await $RefParser.parse(schemaFilePath, {
      continueOnError: true, 
      parse: {
        yaml: {
          allowEmpty: true
        }
      },
    });
  } catch(err) {
    logger.error(`Error parsing model: ${schemaFilePath}`, err);
    throw err;
  }
  /*
  try {
    const result = validate(schema, typeSchema);
  } catch (e) {
    throw new Error(`Error validating schema:\n${JSON.stringify(e)}`);
  }
  */
 if (schema !== null) {
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
 } else {
  return justCopySchema(schemaFilePath);
 }
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
