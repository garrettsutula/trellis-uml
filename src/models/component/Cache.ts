import {
  Device, ExecutionEnvironment, Component, ComponentType,
} from '..';

export class Cache extends Component {
  type = ComponentType.Database;

  stereotype = 'Cache';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this.parentComponent = newEnvironment;
  }
}
