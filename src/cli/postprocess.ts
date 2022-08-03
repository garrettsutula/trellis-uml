import { logError } from "../common/logger";

export default (schema, postprocessFn) => {
  if (postprocessFn) {
    try {
      const processedSchema = postprocessFn(schema);
      return processedSchema;
    } catch(err) {
      logError(`⛔️ Error running post-processing script on schema\n${JSON.stringify(schema)}`);
      throw err;
    }
    
  }
  return schema;
};
