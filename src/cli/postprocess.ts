import logger from "../common/logger";
import { postprocessModel } from 'trellis-core';

export default async (modelPath, postprocessFn = model => model ) => {
    try {
      const model =  await postprocessModel(modelPath, postprocessFn);
      return model;
    } catch(err) {
      logger.error(`⛔️ Error running post-processing script on model: "${modelPath}"`, err);
      throw err;
    }  
};
