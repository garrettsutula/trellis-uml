import { Component, Device, ExecutionEnvironment } from '..';
import { ComponentType } from '../base/enums';

export class UI extends Component {
  type = ComponentType.UI;

  stereotype = 'UI';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this.parentComponent = newEnvironment;
  }
}
