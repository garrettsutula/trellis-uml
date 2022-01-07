import { titleAndHeader, startUml, endUml } from './chrome';
import { Component } from '../models/component/Component';
import { ComponentType } from '../models/base/enums';
import { ComponentRelationship } from '../models/component-relationship';
import { System } from '../models/system';
import { buildComponentMarkup as buildSystemMarkup } from './system-diagram';
import { escapeString } from '../common/utils';

export function getDeploymentDiagramType(type: ComponentType): string {
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
    case ComponentType.Queue:
    case ComponentType.Topic:
    case ComponentType.EventQueue:
      return 'queue';
    case ComponentType.Processor:
      return 'control';
    case ComponentType.Schema:
      return 'artifact';
    default:
      return 'component';
  }
}

export function buildComponentMarkup(component: Component, componentsToRender: Map<string, Component>, tabIndex: number = 1) {
  let output = '';
  const componentString = getDeploymentDiagramType(component.type);

  if (component.system && component.parentComponent && component.system !== component.parentComponent.system) {
    output += `${buildSystemMarkup(component.system, tabIndex, component.parentComponent.id)}{\n`;
    // eslint-disable-next-line no-param-reassign
    tabIndex += 1;
  }
  output += `${'\t'.repeat(tabIndex)}`;
  output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
  if (component.stereotype || component.type) output += ` <<${component.stereotype || component.type}>>`;
  if (component.color) output += ` #${component.color}`;

  if (component.childComponents.length) {
    output += ' {\n';
    component.childComponents.forEach((childComponent) => {
      if (componentsToRender.has(childComponent.id)) {
        const markup = buildComponentMarkup(childComponent, componentsToRender, tabIndex + 1);
        if (markup.length) output += markup;
        if (output.slice(-1) !== '\n') output += '\n';
      }
    });
    output += `${'\t'.repeat(tabIndex)}}\n`;
  }
  if (component.system && component.parentComponent && component.system !== component.parentComponent.system) {
    // eslint-disable-next-line no-param-reassign
    tabIndex -= 1;
    output += `\n${'\t'.repeat(tabIndex)}}\n`;
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
  // Add child components to their execution environments as desginated on instantiated components.
  components
    .forEach((component) => {
      if (component.parentComponent) {
        component.parentComponent.childComponents.push(component);
      }
    });
  return components
    .filter((component) => component.parentComponent === undefined)
    .reduce((output, component): string => output.concat(`${buildComponentMarkup(component, componentsToRender)}\n`), '');
}

function buildRelationships(relationships: Array<ComponentRelationship>): string {
  const relationshipsAlreadyAdded = [];
  return relationships
    .filter((relationship) => relationship.source.type !== ComponentType.ExecutionEnvironment
        && relationship.target.type !== ComponentType.ExecutionEnvironment)
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

export function buildDeploymentDiagram(system: System): string {
  let output: string = startUml(`Deployment Diagram ${system.name}`);
  output += titleAndHeader(system.name, 'Deployment');
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

  system.componentRelationships.forEach(({ source, target }) => {
    if (componentsToRender.has(source.id) === false) componentsToRender.set(source.id, source);
    if (componentsToRender.has(target.id) === false) componentsToRender.set(target.id, target);
  });

  // Identify top level components (ones without execution environments) and build markup recursively.
  output += buildComponents(Array.from(topLevelComponents.values()), componentsToRender);
  // Filter in relationships that connect to an execution environment & build markup.
  output += buildRelationships(system.componentRelationships);
  output += endUml();
  return output;
}
