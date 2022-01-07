import { escapeString } from '../../common/utils';
import { ComponentType, LifecycleState } from '.';

export interface BaseComponentConfiguration {
  label?: string;
  id?: string;
  type?: ComponentType;
  lifecycleState?: LifecycleState;
  description?: string;
  stereotype?: string;
  color?: string;
}

export class BaseComponent implements BaseComponentConfiguration {
  label: string;

  protected _id: string;

  type: ComponentType;

  lifecycleState?: LifecycleState;

  description?: string;

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
