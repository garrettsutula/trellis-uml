import { Component } from './Component';
import type { Database } from '.';
import { ComponentType } from '../base/enums';

export class Schema extends Component {
  type = ComponentType.Schema;

  stereotype: string = 'Schema';

  protected _parentComponent?: Database;

  public get parentComponent(): Database {
    return this._parentComponent;
  }

  public set parentComponent(newEnvironment: Database) {
    this._parentComponent = newEnvironment;
  }
}
