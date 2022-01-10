import { Component } from './Component';
import { ComponentType } from '../base/enums';

export class Actor extends Component {
  type = ComponentType.Actor;

  stereotype: string = 'HUMAN';
}
