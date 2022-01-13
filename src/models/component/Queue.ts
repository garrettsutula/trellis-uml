import { Component } from './Component';
import type { API, Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class Queue extends Component {
  type = ComponentType.Queue;

  stereotype = 'Queue';

  interfaces?: {
    subscribe: API,
    publish: API,
  };

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this._parentComponent = newEnvironment;
  }
}
