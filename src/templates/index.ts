import { globAsync } from "../common/glob";
import { readFile } from "fs/promises";
import path from "path";
import { registerPartials as register, compileTemplate as compile } from 'trellis-core';


import { templateType } from "../common/regex";

export async function registerPartials() {
  const partialsPaths = await globAsync('./templates/partials/**/*.hbs');
    // Register partials in project for use in any template.
    const partials = (await Promise.all(partialsPaths.map((filePath) => readFile(filePath))))
      .map((partialBuf, i) => {
        return { 
            name: path.basename(partialsPaths[i]).replace('.hbs', ''), 
            template: partialBuf.toString(),
        }
      });
      register(partials);
}

export async function getTemplates(onlyPaths?: string[]) {
  const templates = {};
  const templatePaths = await globAsync('./templates/*.hbs');
  const loadedTemplates = await Promise.all(templatePaths.map(async (templatePath) => {
    return {
      type: templatePath.match(templateType)[1],
      template: compile((await readFile(templatePath)).toString()),
    }
  }));
  loadedTemplates.forEach(({type, template}) => templates[type] = template);
  return templates;
}