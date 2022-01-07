import { Component, ComponentType } from '..';

export class Actor extends Component {
  type = ComponentType.Actor;

  stereotype: string = 'HUMAN';
}
