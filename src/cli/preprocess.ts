import * as path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import logger from '../common/logger';
import { preprocessModel } from 'trellis-core';

export default async function preprocessSchema(modelFilePath: string, preprocessingFn = model => model): Promise<string> {
  let model;
  try {
    model = await preprocessModel(modelFilePath, preprocessingFn);
  } catch (err) {
    logger.error(`⛔️ Error pre-processing model: ${path.basename(modelFilePath)}`, err);
    throw err;
  }
  const outputPath = path.join('./temp', modelFilePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, model);
  return outputPath;
}
