import { escapeString } from '../../common/utils';
import { Component } from '../../models';

function buildComponentMarkup(component: Component, getComponentDiagramType: Function, tabIndex: number = 1): string {
  let output = '';
  const componentString = getComponentDiagramType(component.type);
  output += `${'\t'.repeat(tabIndex)}`;
  output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
  if (component.stereotype) output += ` <<${component.stereotype}>>`;
  if (component.color) output += ` #${component.color}`;

  if (component.childComponents.length) {
    output += ' {\n';
    component.childComponents.forEach((childComponent) => {
      output += `${this.buildComponentMarkup(childComponent, getComponentDiagramType, tabIndex + 1)}\n`;
    });
    output += '}';
  }
  return output;
}

export default buildComponentMarkup;
