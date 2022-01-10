import { Domain } from '..';

export class Device extends Domain {
  stereotype = 'Device';

  protected _parentComponent?: Domain;

  public get parentComponent(): Domain {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: Domain) {
    this.parentComponent = newEnvironment;
  }
}
