import * as path from 'path';
import { mkdir, writeFile, copyFile } from 'fs/promises';

const YAML = require('yaml');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function preprocessSchema(schemaFilePath: string, preprocessingFn: any): Promise<string> {
  let schema = await $RefParser.parse(schemaFilePath);
  try {
    schema = await preprocessingFn(schema);
  } catch (e) {
    throw new Error(`Error pre-processing schema: ${path.basename(schemaFilePath)}\n${JSON.stringify(e)}`);
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

export default (filePath, preprocessFn): Promise<string> => {
  if (preprocessFn) {
    return preprocessSchema(filePath, preprocessFn);
  }
  return justCopySchema(filePath);
};
