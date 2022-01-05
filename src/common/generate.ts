import { writeFileSync } from 'fs';
import { System } from '../models/system';
import { generateComponentDiagram } from '../plantuml/component-diagram';
import { generateNetworkDiagram } from '../plantuml/network-diagram';
import { generateSystemDiagram } from '../plantuml/system-diagram';
import { generateDeploymentDiagram } from '../plantuml/deployment-diagram';

export function generateSystemDiagrams(system: System, path: string) {
  const diagrams = [];
  try {
    diagrams.push(generateNetworkDiagram(system));
  } catch (e) {
    throw new Error('Error generating network diagrams.');
  }

  try {
    diagrams.push(generateDeploymentDiagram(system));
  } catch (e) {
    throw new Error('Error generating deployment diagrams.');
  }

  try {
    diagrams.push(generateComponentDiagram(system));
  } catch (e) {
    throw new Error('Error generating component diagrams.');
  }

  try {
    diagrams.push(generateSystemDiagram(system));
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
