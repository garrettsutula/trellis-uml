import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import chalk from 'chalk';

import { escapeString } from '../common/utils';
import { DiagramRoot } from '../models';
import { build as buildSystemDiagrams } from '../generators/diagram';

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

export async function buildProject() {
  // Make sure current diagram code is compiled.
  console.log(chalk.dim(`Running 'npm run build' on current directory ${currentFolder}.`));
  try {
    execSync('npm run build');
  } catch (e) {
    throw new Error('Failed to build using project\'s build script.');
  }

  // Test for output directory structure & create if needed.
  console.log(chalk.dim(`Test presence of: ${currentFolder}/diagrams`));
  try {
    await access('./diagrams');
  } catch (e) {
    console.warn(`Directory '${currentFolder}/diagrams' not present, attempting to create it & child directories.`);
    await mkdir(path.join(workingDirectoryPath, './diagrams'));
    await mkdir(path.join(workingDirectoryPath, './diagrams/systems'), { recursive: true });
    await mkdir(path.join(workingDirectoryPath, './diagrams/services'), { recursive: true });
    await mkdir(path.join(workingDirectoryPath, './diagrams/solutions'), { recursive: true });
    await mkdir(path.join(workingDirectoryPath, './diagrams/domains'), { recursive: true });
  }
  // Load compiled diagram source code as diagram root
  console.log(chalk.dim(`Loading diagram root: ${currentFolder}/dist/app.js`));
  const diagramPath = path.join(workingDirectoryPath, './dist/app.js');
  const diagramRoot: DiagramRoot = await import(diagramPath);
  // Default export not intended/used here but may be present in diagramRoom.systems.
  delete diagramRoot.systems.default;

  console.table(Object
    .values(diagramRoot.systems)
    // eslint-disable-next-line max-len
    .map(({ name, components, componentRelationships }) => ({ name, componentCount: Object.values(components).length, relationshipCount: componentRelationships.length })));
  console.log(chalk.dim('Building digrams from source code.'));
  try {
    await Promise.all(Object.values(diagramRoot.systems)
      .map((system) => {
        const diagramOutputPath = path.join(workingDirectoryPath, `./diagrams/systems/${escapeString(system.name)}.puml`);
        return buildSystemDiagrams(system, diagramOutputPath);
      }));
  } catch (e) {
    throw new Error(e);
  }
}
