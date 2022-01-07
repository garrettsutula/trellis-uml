import { Actor, UI } from '..';
import { ComponentRelationship } from './ComponentRelationship';

export class Uses extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';

  source: Actor;

  target: UI;
}
