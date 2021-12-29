import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { generateSystemDiagrams, escapeString } from '../common';
import { DiagramRoot } from '../models';

const scriptPath = __dirname;
const workingDirectoryPath = process.cwd();
const currentFolder = path.basename(workingDirectoryPath);

export async function buildProject() {

    try {
        await access('./diagrams');
    } catch (e) {
        await mkdir(path.join(workingDirectoryPath, './diagrams'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/systems'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/services'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/solutions'));
        await mkdir(path.join(workingDirectoryPath, './diagrams/domains'));
    }
    const diagramPath = path.join(workingDirectoryPath, './dist/app.js');
    const diagramRoot: DiagramRoot = await import(path.join(workingDirectoryPath, './dist/app.js'));
    Object.values(diagramRoot.systems).forEach((system) => {
        generateSystemDiagrams(system, path.join(workingDirectoryPath, `./diagrams/systems/${escapeString(system.name)}.puml`))
    });
}