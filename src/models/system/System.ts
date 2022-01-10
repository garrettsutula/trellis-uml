import { Component } from '../component';
import { ComponentRelationship } from '../component-relationship';
import { escapeString } from '../../common/utils';
import { LifecycleState } from '../base/enums';

export class System implements SystemConfiguration {
  name: string;

  private _id: string;

  lifecycleState?: LifecycleState;

  color?: string;

  private _components: { [key: string]: Component };

  componentRelationships?: ComponentRelationship[];

  constructor(config: SystemConfiguration) {
    this.name = config.name;
    this.id = config.name;
    this.components = config.components;
    this.componentRelationships = config.componentRelationships || [];
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

  public set components(newComponents: { [key: string]: Component }) {
    Object.values(newComponents).forEach((component) => {
      // eslint-disable-next-line no-param-reassign
      if (!component.system) { component.system = this; }
    });
    this._components = newComponents;
  }
}

export interface SystemConfiguration {
  name: string;
  id?: string;
  color?: string;
  lifecycleState?: LifecycleState;
  components: { [key: string]: Component };
  componentRelationships?: ComponentRelationship[];
}
