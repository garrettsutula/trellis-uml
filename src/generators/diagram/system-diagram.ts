/* eslint-disable no-param-reassign */
import { System, SystemRelationship } from '../../models';
import { startUml, titleAndHeader, endUml } from '../diagram-fragment/chrome';
import buildRelationshipMarkup from '../diagram-fragment/relationship';
import { Solution } from '../../models/solution';

function buildComponentRelationships(relationships: Array<SystemRelationship>): string {
  const relationshipsAlreadyAdded = [];
  return relationships
    .reduce((output, relationship): string => {
      if (relationship.entities?.length) {
        const entitiesMarkup = relationship.entities.map((entity) => `**${entity.entity.name}**`).join('\\n');
        if (relationship.description) relationship.description += `\\n${entitiesMarkup}`;
        else relationship.description = entitiesMarkup;
      }
      const newLine = buildRelationshipMarkup(relationship);
      // eslint-disable-next-line no-param-reassign
      if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
      return output;
    }, '');
}

export function buildComponentMarkup(system: System, tabIndex: number = 0, compoundIdentifier?: string) {
  let output = '';
  let compoundId = '';
  if (compoundIdentifier) {
    compoundId = `${system.id}_${compoundIdentifier}`;
  } else {
    compoundId = `${system.id}`;
  }
  output += `${'\t'.repeat(tabIndex)}`;
  output += `package "${system.name}" as ${compoundId} <<System>>`;
  if (system.color) output += ` #${system.color}`;
  return output;
}

function buildComponents(systems: Array<System>) {
  return systems
    .reduce((output, system): string => output.concat(`${buildComponentMarkup(system)}\n`), '');
}
export function buildSystemDiagram(solution: Solution): string {
  let output: string = startUml(`Solution System Diagram ${solution.name}`);
  output += titleAndHeader(solution.name, 'Solution');
  output += buildComponents(Object.values(solution.systems));
  output += buildComponentRelationships(solution.systemRelationships);
  output += endUml();
  return output;
}
