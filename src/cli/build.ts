import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import { escapeString } from '../common/utils';
import { DiagramRoot } from '../models';
import { generateSystemDiagrams } from '../common/generate';

const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

export async function buildProject() {
  // Make sure current diagram code is compiled.
  console.time(`Running 'npm run build' on current directory ${currentFolder} in`);
  try {
    execSync('npm run build');
  } catch (e) {
    throw new Error('Failed to build using project\'s build script.');
  }
  console.timeEnd(`Running 'npm run build' on current directory ${currentFolder} in`);

  // Test for output directory structure & create if needed.
  console.time(`Made sure output directories are created by testing access to: ${currentFolder}/diagrams in`);
  try {
    await access('./diagrams');
  } catch (e) {
    console.warn(`Directory '${currentFolder}/diagrams' not present, attempting to create it & child directories.`);
    await mkdir(path.join(workingDirectoryPath, './diagrams'));
    await mkdir(path.join(workingDirectoryPath, './diagrams/systems'));
    await mkdir(path.join(workingDirectoryPath, './diagrams/services'));
    await mkdir(path.join(workingDirectoryPath, './diagrams/solutions'));
    await mkdir(path.join(workingDirectoryPath, './diagrams/domains'));
  }
  console.timeEnd(`Made sure output directories are created by testing access to: ${currentFolder}/diagrams in`);
  // Load compiled diagram source code as diagram root
  console.time(`Loaded diagram root: ${currentFolder}/dist/app.js in`);
  const diagramPath = path.join(workingDirectoryPath, './dist/app.js');
  const diagramRoot: DiagramRoot = await import(diagramPath);
  console.timeEnd(`Loaded diagram root: ${currentFolder}/dist/app.js in`);
  // System Diagram Generation
  console.log(`Generating system digrams for: ${Object
    .values(diagramRoot.systems)
    .reduce((systemList, system) => `${systemList}${system.name}, `, '')}`);
  console.time('Generation completed in');
  Object.values(diagramRoot.systems)
    .map((system) => {
      const diagramOutputPath = path.join(workingDirectoryPath, `./diagrams/systems/${escapeString(system.name)}.puml`);
      return generateSystemDiagrams(system, diagramOutputPath);
    });
  console.timeEnd('Generation completed in');
}
