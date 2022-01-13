import { System, Component, ComponentRelationship } from '../../models';
import { ComponentType } from '../../models/base/enums';
import { startUml, titleAndHeader, endUml } from '../diagram-fragment/chrome';
import buildComponentMarkup from '../diagram-fragment/component';
import buildRelationshipMarkup from '../diagram-fragment/relationship';
import { Solution } from '../../models/solution';

export function getNetworkDiagramType(type: ComponentType): string {
  switch (type) {
    case ComponentType.ExecutionEnvironment:
      return 'node';
    default:
      return 'component';
  }
}

function recurseParentComponents(component: Component, allComponents: Set<Component>) {
  if (component.parentComponent) {
    allComponents.add(component.parentComponent);
    return recurseParentComponents(component.parentComponent, allComponents);
  }
  return component;
}

export function buildNetworkDiagram(system: System): string;
export function buildNetworkDiagram(solution: Solution): string;
export function buildNetworkDiagram(input: System | Solution): string {
  const topLevelComponents = new Set<Component>();
  const allComponents = new Set<Component>();
  const allComponentRelationships = new Array<ComponentRelationship>();
  let output: string = startUml(`Network Diagram ${input.name}`);

  output += titleAndHeader(input.name, 'Network');

  if (input instanceof Solution) {
    const solution = input;
    Object.values(solution.systems).forEach((system) => {
      Object.values(system.components)
        .forEach((component) => allComponents.add(component));
      system.componentRelationships
        .forEach(({ source, target }) => {
          allComponents.add(source).add(target);
        });
      allComponentRelationships.push(...system.componentRelationships);
    });
  } else {
    const system = input;
    Object.values(system.components)
      .forEach((component) => allComponents.add(component));
    system.componentRelationships
      .forEach(({ source, target }) => {
        allComponents.add(source).add(target);
      });
    allComponentRelationships.push(...system.componentRelationships);
  }

  Array.from(allComponents.values()).forEach((component) => {
    topLevelComponents.add(recurseParentComponents(component, allComponents));
  });

  output += Array.from(topLevelComponents.values())
    .filter(({ type }) => type === ComponentType.ExecutionEnvironment)
    // eslint-disable-next-line max-len
    .reduce((componentOutput, component): string => componentOutput.concat(`${buildComponentMarkup(component, getNetworkDiagramType, 0, [ComponentType.ExecutionEnvironment], Array.from(allComponents.values()))}\n`), '');

  const relationshipsAlreadyAdded = [];
  output += allComponentRelationships
    .filter((relationship) => relationship.source.type === ComponentType.ExecutionEnvironment
      && relationship.target.type === ComponentType.ExecutionEnvironment)
    .reduce((relationshipOutput, relationship): string => {
      const newLine = buildRelationshipMarkup(relationship);
      // eslint-disable-next-line no-param-reassign
      if (!relationshipsAlreadyAdded.includes(newLine)) relationshipOutput += newLine;
      return relationshipOutput;
    }, '');
  output += endUml();

  return output;
}
