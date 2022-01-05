import { Component } from './component';
import { ComponentRelationship } from './component-relationship';
import { escapeString } from '../common/utils';

export class System implements SystemConfiguration {
  name: string;

  private _id: string;

  color?: string;

  private _components: Component[];

  componentRelationships?: ComponentRelationship[];

  systemRelationships?: ComponentRelationship[];

  constructor(config: SystemConfiguration) {
    this.name = config.name;
    this.id = config.name;
    this.components = config.components;
    this.componentRelationships = config.componentRelationships || [];
    this.systemRelationships = config.systemRelationships || [];
  }

  public get id() {
    return this._id;
  }

  public set id(newId: string) {
    this._id = escapeString(newId);
  }

  public get components() {
    return this._components;
  }

  public set components(newComponents: Component[]) {
    newComponents.forEach((component) => {
      if (!component.system) { component.system = this; }
    });
    this._components = newComponents;
  }
}

export interface SystemConfiguration {
  name: string;
  id?: string;
  color?: string;
  components: Component[];
  componentRelationships?: ComponentRelationship[];
  systemRelationships?: ComponentRelationship[];
}
