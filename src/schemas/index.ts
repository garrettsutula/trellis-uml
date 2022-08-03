import { globAsync } from "../common/glob";
import { logError } from "../common/logger";
import { schemaType } from "../common/regex";

export async function getSchemaPaths(onlyPaths?: string[]) {
  const schemaPaths = {};
  const schemaFilePaths = await globAsync('./schemas/*.json');
    schemaFilePaths.forEach((schemaPath) => {
      try {
        const type = schemaPath.match(schemaType)[1];
        schemaPaths[type] = schemaPath;
      } catch (err) {
        logError(`Problem getting schema paths for '${schemaPath}'`, err);
        throw err;
      }
    });

  return schemaPaths;
}