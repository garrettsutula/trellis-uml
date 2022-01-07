import { Component, Device, ExecutionEnvironment } from '.';
import { ComponentType } from '../base/enums';

export class Database extends Component {
  type = ComponentType.Database;

  stereotype: string = 'Database';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this.parentComponent = newEnvironment;
  }
}
