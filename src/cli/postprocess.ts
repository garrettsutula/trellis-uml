import logger from "../common/logger";
import { getCircularReplacer } from "../common/json";

const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function dereferenceSchema(modelPath): Promise<string> {
  let model;
  try {
    model = await $RefParser.dereference(modelPath);
  } catch (err) {
    logger.error(`⛔️ Error de-referencing model: "${modelPath}", check model "$ref"s`, err);
    throw err;
  }
  return model;
}

export default async (modelPath, postprocessFn = model => model ) => {
  if (postprocessFn) {
    try {
      const model = await dereferenceSchema(modelPath);
      const processedSchema = postprocessFn(model);
      return processedSchema;
    } catch(err) {
      logger.error(`⛔️ Error running post-processing script on model: "${modelPath}"`);
      throw err;
    }
    
  }
  return dereferenceSchema(modelPath);
};
