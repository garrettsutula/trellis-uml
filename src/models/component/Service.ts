import {
  Device, ExecutionEnvironment, Component, ComponentType,
} from '.';

export class Service extends Component {
  type = ComponentType.Service;

  stereotype = 'Service';

  protected _parentComponent?: ExecutionEnvironment | Device;

  public get parentComponent(): ExecutionEnvironment | Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: ExecutionEnvironment | Device) {
    this.parentComponent = newEnvironment;
  }
}
