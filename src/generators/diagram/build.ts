import { writeFile } from 'fs/promises';
import { Solution, System } from '../../models';
import { buildComponentDiagram } from './component-diagram';
import { buildNetworkDiagram } from './network-diagram';
import { buildDeploymentDiagram } from './deployment-diagram';
import { buildSystemDiagram } from './system-diagram';

export function build(input: Solution, path: string);
export function build(input: System, path: string);
export function build(input: any, path:string) {
  const diagrams = [];
  try {
    diagrams.push(buildNetworkDiagram(input));
  } catch (e) {
    throw new Error('Error generating network diagram.');
  }

  try {
    diagrams.push(buildDeploymentDiagram(input));
  } catch (e) {
    throw new Error('Error generating deployment diagram.');
  }

  try {
    diagrams.push(buildComponentDiagram(input));
  } catch (e) {
    throw new Error('Error generating component diagram.');
  }

  if (input instanceof Solution) {
    try {
      diagrams.push(buildSystemDiagram(input));
    } catch (e) {
      throw new Error('Error generating system diagram.');
    }
  }

  const output = diagrams.join("\n''''''''''''''''''''''''''''''\n");

  return writeFile(path, output);
}
