import { Component } from './Component';
import type { Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class Queue extends Component {
  type = ComponentType.Queue;

  stereotype = 'Queue';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this._parentComponent = newEnvironment;
  }
}
