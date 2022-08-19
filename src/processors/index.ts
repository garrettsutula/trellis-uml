import path from "path";

import { globAsync } from "../common/glob";
import { scriptType } from "../common/regex";

export async function getScripts(onlyPaths?: string[]) {
  const scriptPaths = {};

  const preprocessingScriptPaths = await globAsync('./processors/*.js');
  const preprocessingScripts = await Promise.all(preprocessingScriptPaths.map(async (scriptPath) => {
    const scripts = await import(`${path.join(process.cwd(), scriptPath)}`);
    return {
      preprocessFn: scripts.preprocessFn,
      postprocessFn: scripts.postprocessFn,
    }
  }))
  preprocessingScriptPaths.forEach((scriptPath, i) => {
    const type = scriptPath.match(scriptType)[1];
    scriptPaths[type] = preprocessingScripts[i];
  });
  return scriptPaths;
}
