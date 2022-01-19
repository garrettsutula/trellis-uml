import { Component } from './Component';
import { API } from './API';
import type { Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class Service extends Component {
  type = ComponentType.Service;

  stereotype = 'Service';

  interface: API;

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newParentComponent: ExecutionEnvironment | Device) {
    this.propogateParentRelationship(newParentComponent);
  }

  constructor(label, config) {
    super(label, config);
    this.interface = new API('subscribe', { parentComponent: this });
  }
}
