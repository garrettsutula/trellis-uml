import type { Device } from '.';
import { Domain } from './Domain';

export class ExecutionEnvironment extends Domain {
  stereotype = 'Execution Environment';

  protected _parentComponent?: Device;

  public get parentComponent(): Device {
    return this._parentComponent;
  }

  public set parentComponent(newParentComponent: Device) {
    this.propogateParentRelationship(newParentComponent);
  }
}
