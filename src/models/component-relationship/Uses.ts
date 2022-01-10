import { Actor, UI } from '../component';
import { ComponentRelationship } from './ComponentRelationship';

export class Uses extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';

  source: Actor;

  target: UI;
}
