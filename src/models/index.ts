import { globAsync } from "../common/glob";
import { extractModelType } from "../common/regex";

export async function getModelPaths(onlyPaths?: string[]) {
  const modelPaths = {};

  const modelFilePaths = await globAsync('./models/**/*.yaml');
  modelFilePaths.forEach((modelPath) => {
    const type = modelPath.match(extractModelType)[1];
    if(modelPaths[type]) {
      modelPaths[type].push(modelPath);
    } else {
      modelPaths[type] = [ modelPath ];
    }
  })
  return modelPaths;
}