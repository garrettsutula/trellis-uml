import { escapeString } from '../../common/utils';
import { Component } from '../../models';
import { ComponentType } from '../../models/base/enums';

const buildComponentMarkup = (
  component: Component,
  getComponentDiagramType: Function,
  tabIndex: number = 1,
  renderTypes: ComponentType[] = [],
): string => {
  let output = '';
  if (renderTypes.length === 0 || renderTypes.includes(component.type)) {
    const componentString = getComponentDiagramType(component.type);
    output += `${'\t'.repeat(tabIndex)}`;
    output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
    if (component.stereotype) output += ` <<${component.stereotype}>>`;
    if (component.color) output += ` #${component.color}`;

    if (component.childComponents.length) {
      output += ' {\n';
      component.childComponents.forEach((childComponent) => {
        const childOutput = buildComponentMarkup(childComponent, getComponentDiagramType, tabIndex + 1, renderTypes);
        if (childOutput.length) {
          output += `${childOutput}\n`;
        }
      });
      output += `${'\t'.repeat(tabIndex)}`;
      output += '}';
    }
  }
  return output;
};

export default buildComponentMarkup;
