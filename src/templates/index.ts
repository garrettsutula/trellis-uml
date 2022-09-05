import { globAsync } from "../common/glob";
import { readFile } from "fs/promises";
import path from "path";
import { registerPartials as register, compileTemplate as compile } from 'trellis-core';


import { templateType, extractTemplateType } from "../common/regex";

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
  const templatePaths = await globAsync('./templates/**(!partials)/*.hbs');
  const loadedTemplates = await Promise.all(templatePaths.map(async (templatePath) => {
    const {groups: {modelType, fileName, fileType} = {}} = templatePath.match(extractTemplateType);
    return {
      modelType,
      fileType,
      fileName,
      template: compile((await readFile(templatePath)).toString()),
    }
  }));
  loadedTemplates.forEach((template) => {
    const { modelType } = template;
    if (!templates[modelType]) templates[modelType] = [];
    templates[modelType].push(template);
  });
  return templates;
}