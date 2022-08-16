import { globAsync } from "../common/glob";
import { readFile } from "fs/promises";
import path from "path";
import * as Handlebars from 'handlebars';

import { templateType } from "../common/regex";
import helpers from './helpers';

export function registerHelpers() {
    helpers.forEach(({name, helperFn}) => Handlebars.registerHelper(name, helperFn));
}

export async function registerPartials() {
  const partialsPaths = await globAsync('./templates/partials/**/*.hbs');
    // Register partials in project for use in any template.
    const partials = await Promise.all(partialsPaths.map((filePath) => readFile(filePath)));
    partialsPaths.forEach((filePath, i) => Handlebars.registerPartial(path.basename(filePath).replace('.hbs', ''), partials[i].toString()));
}

export async function getTemplates(onlyPaths?: string[]) {
  const templates = {};
  const templatePaths = await globAsync('./templates/*.hbs');
  const loadedTemplates = await Promise.all(templatePaths.map(async (templatePath) => {
    return {
      type: templatePath.match(templateType)[1],
      template: Handlebars.compile((await readFile(templatePath)).toString()) as Handlebars.Template,
    }
  }));
  loadedTemplates.forEach(({type, template}) => templates[type] = template);
  return templates;
}