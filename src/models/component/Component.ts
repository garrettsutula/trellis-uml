import { BaseComponent, BaseComponentConfiguration } from '../base';
import type { System } from '../system';

export class Component extends BaseComponent {
  system?: System;

  protected _parentComponent?: Component;

  childComponents?: Component[];

  constructor(label: string, config?: ComponentConfiguration) {
    super(label, config);
    this.label = config?.label || label;
    this.id = config?.id || label;
    this.type = config?.type;
    if (config?.stereotype) {
      this.stereotype = config.stereotype;
    }
    this.color = config?.color;
    this.childComponents = config?.childComponents || [];
    this.parentComponent = config?.parentComponent;
  }

  public get parentComponent() {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: Component) {
    if ((newEnvironment && newEnvironment?.id) !== this?.parentComponent?.id) {
      const indexOfComponent = this.parentComponent?.childComponents.findIndex(({ id }) => this.id === id);
      if (indexOfComponent > -1) {
        this.parentComponent.childComponents.splice(indexOfComponent, 1);
      }
      this._parentComponent = newEnvironment;
    }
    if (this.parentComponent?.childComponents.findIndex(({ id }) => this.id === id) === -1) {
      this.parentComponent.childComponents.push(this);
    }
  }
}

export interface ComponentConfiguration extends BaseComponentConfiguration {
  parentComponent?: Component;
  childComponents?: Array<Component>;
}
