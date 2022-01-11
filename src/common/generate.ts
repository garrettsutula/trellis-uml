import { writeFileSync } from 'fs';
import { System } from '../models/system';
import { buildComponentDiagram } from '../generators/diagram/component-diagram';
import { buildNetworkDiagram } from '../generators/diagram/network-diagram';
import { buildSystemDiagram } from '../plantuml/system-diagram';
import { buildDeploymentDiagram } from '../plantuml/deployment-diagram';

export function buildSystemDiagrams(system: System, path: string) {
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

  try {
    diagrams.push(buildSystemDiagram(system));
  } catch (e) {
    throw new Error('Error generating system diagrams.');
  }

  const output = diagrams.join("\n''''''''''''''''''''''''''''''\n");

  try {
    writeFileSync(path, output);
  } catch (e) {
    throw new Error('Error writing diagrams to filesystem.');
  }
}
