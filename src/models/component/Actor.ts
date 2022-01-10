import { Component } from '..';
import { ComponentType } from '../base/enums';

export class Actor extends Component {
  type = ComponentType.Actor;

  stereotype: string = 'HUMAN';
}
