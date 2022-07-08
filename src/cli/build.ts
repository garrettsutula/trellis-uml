import * as path from 'path';
import { readFile, rm, cp } from 'fs/promises';
import * as Handlebars from 'handlebars';
import chalk from 'chalk';

import preprocess from './preprocess';
import generate from './generate';
import { globAsync } from '../common/glob';
import { extractModelType } from '../common/regex';

export default async function build(): Promise<void> {
  console.time(chalk.dim('Build duration'));
  // Load project files from filesystem.
  const [modelFilePaths, jsonSchemaPaths, preprocessingScriptPaths, templatePaths, partialsPaths] = await Promise.all([
    globAsync('./models/**/*.yaml'),
    globAsync('./schemas/*.json'),
    globAsync('./preprocessors/*.js'),
    globAsync('./templates/*.hbs'),
    globAsync('./templates/partials/*.hbs'),
  ]);

  // Copy project files to temp, any that are preprocessed below are overwritten later.
  await cp('./models/', './temp/models/', { recursive: true });

  const modelTypes = Array.from((new Set(modelFilePaths.map((filePath) => filePath.match(extractModelType)[1]))).values());

  // Register partials in project for use in any template.
  const partials = await Promise.all(partialsPaths.map((filePath) => readFile(filePath)));
  partialsPaths.forEach((filePath, i) => Handlebars.registerPartial(path.basename(filePath).replace('.hbs', ''), partials[i].toString()));

  // Register conditional logic helper
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  await Promise.all(
    modelTypes.map(async (type) => {
      const jsonSchemaPath = jsonSchemaPaths.find((filePath) => filePath.includes(`${type}.schema.json`));
      const templatePath = templatePaths.find((filePath) => filePath.includes(`${type}.hbs`));
      const filePaths = modelFilePaths.filter((filePath) => filePath.includes(`./models/${type}/`));
      const scriptPath = preprocessingScriptPaths.find((filePath) => filePath.includes(`${type}.js`));

      if (filePaths.length && templatePath && jsonSchemaPath) {
        // Pre-processing step.
        let preprocessFn;
        if (scriptPath) preprocessFn = (await import(`${path.join(process.cwd(), scriptPath)}`)).default;
        const typeSchema = JSON.parse((await readFile(jsonSchemaPath)).toString());
        const preprocessedFilePaths = await Promise.all(filePaths.map((filePath) => preprocess(filePath, preprocessFn, typeSchema)));
        // Generate output step.
        const templateStr = await (await readFile(templatePath)).toString();
        const template = Handlebars.compile(templateStr);
        return Promise.all(preprocessedFilePaths.map((filePath) => generate(filePath, template)));
      }
      return [];
    }),
  );
  console.timeEnd(chalk.dim('Build duration'));
  // Clean up temporary workspace.
  await rm('./temp', { recursive: true, force: true });
}
