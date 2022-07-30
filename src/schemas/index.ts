import { globAsync } from "../common/glob";
import { schemaType } from "../common/regex";

export async function getSchemaPaths(onlyPaths?: string[]) {
  const schemaPaths = {};

  const schemaFilePaths = await globAsync('./schemas/*.json');
  schemaFilePaths.forEach((schemaPath) => {
    const type = schemaPath.match(schemaType)[1];
    schemaPaths[type] = schemaPath;
  });
  return schemaPaths;
}