import { Actor, UI } from '../component';
import { ComponentRelationship } from './ComponentRelationship';

export class Uses extends ComponentRelationship {
  diagramFragmentBefore: string = '.';

  diagramFragmentAfter: string = 'down->';

  stereotype = '<<Uses>>';

  source: Actor;

  target: UI;
}
