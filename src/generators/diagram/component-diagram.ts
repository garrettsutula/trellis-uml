import { System, Component, ComponentRelationship } from '../../models';
import { ComponentType } from '../../models/base/enums';
import { startUml, titleAndHeader } from '../../plantuml/chrome';
import systemDiagramFragment from '../diagram-fragment/system';
import buildComponentMarkup from '../diagram-fragment/component';
import buildRelationshipMarkup from '../diagram-fragment/relationship';
import { Solution } from '../../models/solution';

function getComponentDiagramType(type: ComponentType): string {
  switch (type) {
    case ComponentType.UI:
      return 'boundary';
    case ComponentType.Service:
      return 'component';
    case ComponentType.Database:
      return 'database';
    case ComponentType.ExecutionEnvironment:
      return 'node';
    case ComponentType.API:
      return 'interface';
    case ComponentType.Topic:
    case ComponentType.Queue:
    case ComponentType.EventQueue:
      return 'queue';
    case ComponentType.Processor:
      return 'control';
    case ComponentType.Schema:
      return 'artifact';
    case ComponentType.System:
      throw new Error('System component not expected in component diagram generation.');
    default:
      return 'component';
  }
}

function buildComponentRelationships(relationships: Array<ComponentRelationship>): string {
  const relationshipsAlreadyAdded = [];
  return relationships
    .filter((relationship) => relationship.source.type !== ComponentType.ExecutionEnvironment
            && relationship.target.type !== ComponentType.ExecutionEnvironment)
    .reduce((output, relationship): string => {
      const newLine = buildRelationshipMarkup(relationship);
      if (relationshipsAlreadyAdded.includes(newLine)) {
        return output;
      }
      relationshipsAlreadyAdded.push(newLine);
      // eslint-disable-next-line no-param-reassign
      output += newLine;
      return output;
    }, '');
}

function buildComponents(components: Component[]) {
  return components
    .filter((component) => component.type !== ComponentType.ExecutionEnvironment)
    .reduce((output, component): string => output.concat(`${buildComponentMarkup(component, getComponentDiagramType)}\n`), '');
}

function buildSystemMarkup(system: System) {
  let output = '';
  output += `${systemDiagramFragment(system)}{\n`;
  output += buildComponents(Object.values(system.components));
  output += '}\n';
  return output;
}

export function buildComponentDiagram(system: System): string;
export function buildComponentDiagram(solution: Solution): string;
export function buildComponentDiagram(input: System | Solution): string {
  let output = '';
  if (input instanceof Solution) {
    const solution = input;
    output += startUml(`Component Diagram ${solution.name}`);
    output += titleAndHeader(solution.name, 'Component');
    Object.values(solution.systems).forEach((system) => {
      output += buildSystemMarkup(system);
      solution.componentRelationships.push(...system.componentRelationships);
    });
    output += buildComponentRelationships(solution.componentRelationships);
  } else {
    const system = input;
    output += startUml(`Component Diagram ${system.name}`);
    output += titleAndHeader(system.name, 'Component');
    output += buildSystemMarkup(system);
    output += buildComponentRelationships(system.componentRelationships);
  }
  return output;
}
