import { Component, Device, ExecutionEnvironment } from '..';
import { ComponentType } from '../base/enums';

export class Processor extends Component {
  type = ComponentType.Processor;

  stereotype = 'Processor';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this.parentComponent = newEnvironment;
  }
}
