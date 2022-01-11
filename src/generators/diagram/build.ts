import { writeFile } from 'fs/promises';
import { System } from '../../models';
import { buildComponentDiagram } from './component-diagram';
import { buildNetworkDiagram } from './network-diagram';
import { buildDeploymentDiagram } from './deployment-diagram';

export default function build(system: System, path:string) {
  const diagrams = [];
  try {
    diagrams.push(buildNetworkDiagram(system));
  } catch (e) {
    throw new Error('Error generating network diagrams.');
  }

  try {
    diagrams.push(buildDeploymentDiagram(system));
  } catch (e) {
    throw new Error('Error generating deployment diagrams.');
  }

  try {
    diagrams.push(buildComponentDiagram(system));
  } catch (e) {
    throw new Error('Error generating component diagrams.');
  }

  const output = diagrams.join("\n''''''''''''''''''''''''''''''\n");

  return writeFile(path, output);
}
