import { Component, ComponentType } from './Component';

export class Actor extends Component {
  type = ComponentType.Actor;

  stereotype: string = 'HUMAN';
}
