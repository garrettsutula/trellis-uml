import { titleAndHeader, startUml, endUml } from './chrome';
import { escapeString } from '../common/utils';
import { Component, ComponentType } from '../models/component';
import { ComponentRelationship } from '../models/component-relationship';
import { System } from '../models/system';

export function getNetworkDiagramType(type: ComponentType): string {
  switch (type) {
    case ComponentType.ExecutionEnvironment:
      return 'node';
    default:
      return 'component';
  }
}

export function buildComponentMarkup(component: Component, componentsToRender: Map<string, Component>, tabIndex: number = 1) {
  let output = '';
  let renderComponentMarkup = true;
  if (component.type !== ComponentType.ExecutionEnvironment) renderComponentMarkup = false;
  const componentString = getNetworkDiagramType(component.type);
  if (renderComponentMarkup) {
    output += `${'\t'.repeat(tabIndex)}`;
    output += `${componentString} "${component.label}" as ${escapeString(component.id)} <<${component.stereotype || component.type}>>`;
    if (component.color) output += ` #${component.color}`;
  }
  if (component.childComponents.length) {
    if (renderComponentMarkup) output += ' {\n';
    component.childComponents.forEach((childComponent) => {
      if (componentsToRender.has(childComponent.id)) {
        const markup = buildComponentMarkup(childComponent, componentsToRender, tabIndex + 1);
        if (markup.length) output += markup;
        if (output.slice(-1) !== '\n') output += '\n';
      }
    });
    if (renderComponentMarkup) output += `${'\t'.repeat(tabIndex)}}\n`;
  }
  return output;
}

function buildRelationshipMarkup(relationship: ComponentRelationship, tabIndex: number = 1): string {
  // TODO: Implement config interface
  let output = `${'\t'.repeat(tabIndex)}`;
  output += `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
  if (relationship.description) output += `: ${relationship.description}`;
  return `${output}\n`;
}

function buildComponents(components: Array<Component>, componentsToRender: Map<string, Component>) {
  return components
    .reduce((output, component): string => output.concat(buildComponentMarkup(component, componentsToRender)), '');
}

function buildRelationships(relationships: Array<ComponentRelationship>): string {
  const relationshipsAlreadyAdded = [];
  return relationships
    .filter((relationship) => relationship.source.type === ComponentType.ExecutionEnvironment
                && relationship.target.type === ComponentType.ExecutionEnvironment)
    .reduce((output, relationship): string => {
      const newLine = buildRelationshipMarkup(relationship);
      // eslint-disable-next-line no-param-reassign
      if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
      return output;
    }, '');
}

function recurseParentComponents(component: Component, componentsToRender) {
  if (componentsToRender.has(component.id) === false) componentsToRender.set(component.id, component);
  if (component.parentComponent) {
    return recurseParentComponents(component.parentComponent, componentsToRender);
  }
  return component;
}

export function buildNetworkDiagram(system: System): string {
  let output: string = startUml(`Network Diagram ${system.name}`);
  output += titleAndHeader(system.name, 'Network');

  const topLevelComponents = new Map<string, Component>();
  const componentsToRender = new Map();
  const relationshipComponents = new Map();
  // TODO: come back to consolidate/simplify this probably by changing to arrays.
  system.componentRelationships.forEach(({ source, target }) => {
    if (componentsToRender.has(source.id) === false) componentsToRender.set(source.id, source);
    if (componentsToRender.has(target.id) === false) componentsToRender.set(target.id, target);
    if (relationshipComponents.has(target.id) === false) relationshipComponents.set(target.id, target);
    const topSourceComponent = recurseParentComponents(source, componentsToRender);
    const { id: sourceId } = topSourceComponent;
    if (topLevelComponents.has(sourceId) === false) topLevelComponents.set(sourceId, topSourceComponent);
    const topTargetComponent = recurseParentComponents(target, componentsToRender);
    const { id: targetId } = topTargetComponent;
    if (topLevelComponents.has(targetId) === false) topLevelComponents.set(targetId, topTargetComponent);
  });

  system.components.forEach((component) => {
    const topComponent = recurseParentComponents(component, componentsToRender);
    const { id } = topComponent;
    if (topLevelComponents.has(id) === false) topLevelComponents.set(id, topComponent);
  });

  // Identify top level components (ones without execution environments) and build markup recursively.
  output += buildComponents(Array.from(topLevelComponents.values()), componentsToRender);
  // Filter in relationships that connect to an execution environment & build markup.
  output += buildRelationships(system.componentRelationships);
  output += endUml();
  return output;
}
