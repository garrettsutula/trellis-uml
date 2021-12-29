import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import { generateSystemDiagrams, escapeString } from '../common';
import { DiagramRoot } from '../models';

const scriptPath = __dirname;
const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

export async function buildProject() {
    // Make sure current diagram code is compiled.
    execSync('npm run build');
    // Test for output directory structure & create if needed.
    try {
        await access('./diagrams');
    } catch (e) {
        await mkdir(path.join(workingDirectoryPath, './diagrams'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/systems'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/services'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/solutions'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/domains'));
    }
    // Load compiled diagram source code as diagram root
    const diagramPath = path.join(workingDirectoryPath, './dist/app.js');
    const diagramRoot: DiagramRoot = await import(path.join(workingDirectoryPath, './dist/app.js'));
    // System Diagram Generation
    Object.values(diagramRoot.systems).forEach((system) => {
        try {
            generateSystemDiagrams(system, path.join(workingDirectoryPath, `./diagrams/systems/${escapeString(system.name)}.puml`));
        } catch(e) {
            throw new Error(`Diagram generation for system ${system.name} failed. ${JSON.stringify(e)}`);
        }
    });
}