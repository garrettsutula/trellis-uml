import { Component } from './Component';
import type { Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class API extends Component {
  type = ComponentType.API;

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newParentComponent: ExecutionEnvironment | Device) {
    this.propogateParentRelationship(newParentComponent);
  }
}
