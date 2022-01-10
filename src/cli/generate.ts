import { readFile, writeFile, access } from 'fs/promises';
import systemTemplate from './diagram-templates/system';

async function generateNewSystem(name, filePath, indexPath) {
  const renderedSystemTemplate = systemTemplate.replace(/{{name}}/g, name);
  try {
    await access(filePath);
    throw new Error(`File already exists at path: ${filePath}`);
  } catch (e) {
    await writeFile(filePath, renderedSystemTemplate);
  }
  let index: string;
  try {
    await access(indexPath);
    index = (await readFile(indexPath)).toString();
  } catch (e) {
    throw new Error(`Index file not found at: ${indexPath}`);
  }
  if (index.slice(-1) !== '\n') {
    index += '\n';
  }
  index += `export { * as ${name}System } from './${name}'\n`;
  try {
    await writeFile(indexPath, index);
  } catch (e) {
    throw new Error(`Unable to update file at: ${indexPath}`);
  }
}

export async function generateDiagramScaffold(type, name) {
  const indexRelativePath = `./src/${type}s/index.ts`;
  const diagramRelativePath = `./src/${type}s/${name}.ts`;
  switch (type) {
    case 'system':
      return generateNewSystem(name, diagramRelativePath, indexRelativePath);
      break;
    default:
      throw new Error(`Unrecognized diagram type: ${type}`);
  }
}
