import { globAsync } from "../common/glob";
import logger from "../common/logger";
import { schemaType } from "../common/regex";

export async function getSchemaPaths(onlyPaths?: string[]) {
  const schemaPaths = {};
  const schemaFilePaths = await globAsync('./schemas/*.json');
    schemaFilePaths.forEach((schemaPath) => {
      try {
        const type = schemaPath.match(schemaType)[1];
        schemaPaths[type] = schemaPath;
      } catch (err) {
        logger.error(`Problem getting schema paths for '${schemaPath}', likely unexpected file name/type?`, err);
        throw err;
      }
    });

  return schemaPaths;
}