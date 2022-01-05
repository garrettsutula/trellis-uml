import { titleAndHeader, startUml, endUml } from './chrome';
import { ComponentRelationship } from '../models/component-relationship';
import { System } from '../models/system';

export function generateComponentMarkup(system: System, tabIndex: number = 0, compoundIdentifier?: string) {
  let output = '';
  let compoundId = '';
  if (compoundIdentifier) {
    compoundId = `${system.id}_${compoundIdentifier}_package`;
  } else {
    compoundId = `${system.id}_package`;
  }
  output += `${'\t'.repeat(tabIndex)}`;
  output += `package "${system.name}" as ${compoundId} <<System>>`;
  if (system.color) output += ` #${system.color}`;
  return output;
}

function generateRelationshipMarkup(relationship: ComponentRelationship): string {
  // TODO: Implement config interface
  // eslint-disable-next-line max-len
  let output = `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
  if (relationship.description) output += `: ${relationship.description}`;
  return `${output}\n`;
}

function generateComponents(systems: Array<System>) {
  return systems
    .reduce((output, system): string => output += `${generateComponentMarkup(system)}\n`, '');
}

function generateRelationships(relationships: Array<ComponentRelationship>): string {
  const relationshipsAlreadyAdded = [];
  return relationships
    .reduce((output, relationship): string => {
      const newLine = generateRelationshipMarkup(relationship);
      if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
      return output;
    }, '');
}

export function generateSystemDiagram(system: System): string {
  const componentsToRender = new Map();
  componentsToRender.set(system.id, system);
  if (system.systemRelationships) {
    system.systemRelationships.forEach(({ source, target }) => {
      if (componentsToRender.has(source.id) === false) componentsToRender.set(source.id, source);
      if (componentsToRender.has(target.id) === false) componentsToRender.set(target.id, target);
    });
  }

  let output: string = startUml(`System Diagram ${system.name}`);
  output += titleAndHeader(system.name, 'System');
  output += generateComponents(Array.from(componentsToRender.values()));
  if (system.systemRelationships) output += generateRelationships(system.systemRelationships);
  output += endUml();
  return output;
}
