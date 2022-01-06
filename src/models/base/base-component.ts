import { escapeString } from '../../common/utils';

export enum ComponentType {
  UI = 'UI',
  Service = 'Service',
  Database = 'Database',
  ExecutionEnvironment = 'Execution Environment',
  API = 'API',
  Queue = 'Queue',
  Processor = 'Processor',
  Schema = 'Schema',
  Topic = 'Topic',
  EventQueue = 'Event Queue',
  Actor = 'Actor',
  System = 'System',
}

export interface BaseComponentConfiguration {
  label?: string;
  id?: string;
  type?: ComponentType;
  stereotype?: string;
  color?: string;
}

export class BaseComponent implements BaseComponentConfiguration {
  label: string;

  private _id: string;

  type: ComponentType;

  stereotype?: string;

  color?: string;

  constructor(label: string, config?: BaseComponentConfiguration) {
    this.label = config?.label || label;
    this.id = config?.id || label;
    this.type = config?.type;
    if (config?.stereotype) {
      this.stereotype = config.stereotype;
    }
    this.color = config?.color;
  }

  public get id() {
    return this._id;
  }

  public set id(newId: string) {
    this._id = escapeString(newId);
  }
}
