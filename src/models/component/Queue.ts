import { Component } from './Component';
import { API } from './API';
import type { Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class Queue extends Component {
  type = ComponentType.Queue;

  stereotype = 'Queue';

  interfaces: {
    subscribe: API,
    publish: API,
  };

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newParentComponent: ExecutionEnvironment | Device) {
    this.propogateParentRelationship(newParentComponent);
  }

  constructor(label, config) {
    super(label, config);
    this.interfaces.subscribe = new API('subscribe', { parentComponent: this });
    this.interfaces.publish = new API('publish', { parentComponent: this });
  }
}
