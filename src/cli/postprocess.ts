import logger from "../common/logger";
import { getCircularReplacer } from "../common/json";

export default (schema, postprocessFn) => {
  if (postprocessFn) {
    try {
      const processedSchema = postprocessFn(schema);
      return processedSchema;
    } catch(err) {
      logger.error(`⛔️ Error running post-processing script on schema\n${JSON.stringify(schema, getCircularReplacer())}`);
      throw err;
    }
    
  }
  return schema;
};
