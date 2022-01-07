import { Device, Domain } from '..';

export class ExecutionEnvironment extends Domain {
  stereotype = 'Execution Environment';

  protected _parentComponent?: Device;

  public get parentComponent(): Device {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: Device) {
    this.parentComponent = newEnvironment;
  }
}
